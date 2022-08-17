const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const {validateToken} = require("../authentication/authentication");

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
        const [rows, fields] = await db.promiseDb.query("SELECT * FROM user_account WHERE email_address = ?",[emailAddress]);
        if(rows.length <= 0){
            res.send({error: "Incorrect email"})
            return;
        }
        let accountId = rows[0].user_account_id
        let password = rows[0].password;
        let adminStatus = rows[0].admin_status;
        
        bcrypt.compare(attemptedPassword, password).then((match) => {
            if(!match){
                res.send({error: "Wrong Username and password combination"})
                return;
            }

            const accessToken = sign({email_address: emailAddress, user_account_id: accountId, admin_status: adminStatus}, "q1p0w2o9e3i8r4u7t5y6");
            //allow the front end to receive the access token
            res.json({token: accessToken, firstName: rows[0].first_name, id: rows[0].user_account_id, adminStatus: rows[0].admin_status});
            return accountId;
        })
    } catch(err) {
        throw err;
    }
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user)
})

module.exports = router;