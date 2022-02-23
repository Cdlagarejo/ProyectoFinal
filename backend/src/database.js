const mysql = require('mysql');
const { promisify } =require('util');
const { database } = require('./conf.js');

const pool = mysql.createPool(database);


pool.getConnection((err,connection) => {
    if (err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection is closed');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has to many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connnection was refused');
        }
        if (connection) connection.release();
        console.log('DB connected');
        return;
        
    }
});

pool.query = promisify(pool.query);

module.exports = pool;