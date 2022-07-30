const express = require('express');
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", (req, res)=> {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const emailAddress = req.body.emailAddress
    const password = req.body.password

    bcrypt.hash(password, 10).then((hash) => {

        console.log(firstName);

        const sqlInsert = "INSERT INTO user_account (first_name, last_name, email_address, password) VALUES (?, ?, ?, ?)"
        db.query(sqlInsert, [firstName, lastName, emailAddress, hash], (err, result) => {
            if(err){
                console.log(err);
            }
            console.log(result);
            res.send(result)
        })
    })
});

module.exports = router;