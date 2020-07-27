const mysql = require('mysql'); 

function getConnection(){
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password:"",
        database: "movie"
    });
    return con;
}

module.exports.getConnection = getConnection;