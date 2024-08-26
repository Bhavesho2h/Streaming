//Here we have stored the database connection details
require('dotenv').config();

const config = {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}
console.log(config,'config');


module.exports = config;