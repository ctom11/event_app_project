const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
   host: 'localhost',
   user: 'clare',
   password: 'password',
   database: 'eventure'
});

/*app.get('/', (req, res) => {

    const sqlInsert = "INSERT INTO genre (genre_name, genre_description) VALUES ('test genre name', 'test genre description');"
    db.query(sqlInsert, (err, result) => {
        res.send('hello clare');    
    })
    
});*/

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/register", (req, res)=> {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const emailAddress = req.body.emailAddress
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    console.log(firstName);

    const sqlInsert = "INSERT INTO user_account (first_name, last_name, email_address, password, confirm_password) VALUES (?, ?, ?, ?, ?)"
    db.query(sqlInsert, [firstName, lastName, emailAddress, password, confirmPassword], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
    })
});


app.listen(3001, () => {
    console.log("Running on port 3001")
});