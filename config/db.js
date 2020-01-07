/* eslint-disable no-console */
const mysql = require('mysql');
// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mavisluan',
});

// Connect
db.connect(err => {
    if (err) throw err;
    console.log('Mysql Connected ...');
});

module.exports = db;
