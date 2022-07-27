const mysql = require('mysql');

const db = mysql.createPool({
   host: 'localhost',
   user: 'clare',
   password: 'password',
   database: 'eventure',
   /*Allows dates to be shown in YYYY/MM/DD format*/
   dateStrings: 'true'
});

module.exports = db