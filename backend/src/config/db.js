const mysql = require('mysql2');

const normalDb = mysql.createPool({
   host: 'localhost',
   user: 'clare',
   password: 'password',
   database: 'eventure',
   /*Allows dates to be shown in YYYY/MM/DD format*/
   dateStrings: 'true'
});

const promiseDb = normalDb.promise();

module.exports = {normalDb, promiseDb}