const mysql = require('mysql');
require('dotenv').config();
// create connection variable for sql db
let connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "password",
    database: 'burgers_db'
});

connection.connect((err)=>{
    if(err) {
        console.error('error connection: '+err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

// export connection for ORM to use
module.exports = connection;
