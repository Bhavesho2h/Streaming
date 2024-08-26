const mysql = require("mysql");
const config = require("./config");

const connectDB = async() => {
    const pool = mysql.createPool(config);

    pool.getConnection((err,connection)=>{
        if(err){
            console.log({error: err.message});
        }
        console.log("connected to MYSQL database");
        connection.release();
    })
}

module.exports = connectDB;