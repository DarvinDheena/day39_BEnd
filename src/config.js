require('dotenv').config();

const PORT = process.env.PORT ;
const DB_URL = process.env.DB_URL;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS ;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD ;

module.exports = {
    PORT,
    DB_URL,
    EMAIL_ADDRESS,
    EMAIL_PASSWORD
}
