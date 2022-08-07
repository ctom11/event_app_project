const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();

// for comparing input password with hashed password in db
const bcrypt = require("bcrypt");
// sign function creates the token
const {sign} =  require("jsonwebtoken");

router.post("/", async (req, res)=> {

    console.log(req);
    const emailAddress = req.body.emailAddress
    const attemptedPassword = req.body.password
    console.log(emailAddress);
    try {
        const [rows, fields] = await db.promiseDb.query("SELECT user_account_id, password FROM user_account WHERE email_address = ?",[emailAddress]);
        if(rows.length <= 0){
            res.send({error: "Incorrect email"})
            return;
        }
        let accountId = rows[0].user_account_id
        let password = rows[0].password;
        
        bcrypt.compare(attemptedPassword, password).then((match) => {
            if(!match){
                res.send({error: "Wrong Username and password combination"})
                return;
            }

            const accessToken = sign({email_address: emailAddress, user_account_id: accountId}, "q1p0w2o9e3i8r4u7t5y6");
            //allow the front end to receive the access token
            res.json(accessToken);
            return accountId;
        })
    } catch(err) {
        throw err;
    }
});

module.exports = router;