const mysql = require('mysql');

const db = mysql.createPool({
   host: 'localhost',
   user: 'clare',
   password: 'password',
   database: 'eventure'
});

module.exports = db