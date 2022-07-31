const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", async (req, res)=> {

    console.log(req);
    const emailAddress = req.body.emailAddress
    const attemptedPassword = req.body.password
    console.log(emailAddress);
    try {
        const [rows, fields] = await db.promiseDb.query("SELECT password FROM user_account WHERE email_address = ?",[emailAddress]);
        if(rows.length <= 0){
            res.send("Incorrect email")
        }
        let password = rows[0].password;
        bcrypt.compare(attemptedPassword, password).then((match) => {
            if(!match){
                res.send({error: "Wrong Username and password combination"})
            }
            res.send("You logged in")
        })
    } catch(err) {
        throw err;
    }
});

module.exports = router;