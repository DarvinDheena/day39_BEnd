const userRouter = require('express').Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');
const config = require('../config');
const { response } = require('../../server');

// endpoint to view all users 

userRouter.get('/',(request,response)=>{
    User.find({},{})
        .then (users=>{
            response.status(200).json(users);
        })
})

// endpoint to create user

userRouter.post('/',async (request,response) => {
    const {username , password , email  } = new User(request.body)
    const user = await User.findOne({ email })
    if (user) {
        return response.status(400).json({ message : " The Entered user E-Mail  already  exist"});
    }else {
        const user = new User({
            username ,
            email,
            password
        })
        await user.save();
    }
    response.status(200).json({message : "user created successfully"});
})



// endpoint to send email 

userRouter.put('/:email',async (request,response)=>{
    const email  = request.params.email ;
    const user = await User.findOne({email});
    if (!user){
        return response.status(400).json({message : "entered id does not exist or incorrect"});
    }else {
        try {
            // lets create a random  string  fo verification
            const randomString = Math.random().toString(36).substring(2,15);

            // lets create a nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                user: config.EMAIL_ADDRESS,
                pass: config.EMAIL_PASSWORD,
                },
            });
            // lets send mail to user 
            const sendMail = async () => {
                const info = await transporter.sendMail({
                from: `"Darvin Ganeshan"<${config.EMAIL_ADDRESS}>`,
                to: email,
                subject: "Reset Password",
                text: `Kindly use this link to reset the password -${randomString}  `,
                });
            };

            sendMail()
                .then(async ()=>{
                    // lets save that random string in DB for later verification
                    user.randomString = randomString ;
                    await user.save();
                    return response.status(200).json({ message : "A reset link send to your gmail " });
                })
        }catch (error){
            return response.status(400).json(error);
        }        
    }
})

// lets verify string to allow the password reset

userRouter.patch('/:randomstring', async (request,response)=>{
    const randomString = request.params.randomstring;
    const user = await  User.findOne({randomString});
    if (!user){
        return response.status(400).json({ message : "Strring does not match" });
    }
    response.status(200).json({ message : "string verified successfully" });
    
})

// lets reset the password
userRouter.patch('/verified/:email',async (request,response)=>{
    const password = request.body.password;
    const email = request.params.email;

    // find user details and update the password
    const user = await User.findOne({email})
    user.password = password;
    await user.save()
         .then(()=>{
            response.status(200).json({ message:"password changed successfully" });
         })
})



module.exports = userRouter ;

