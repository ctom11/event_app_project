const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");


router.post("/", (req, res)=> {

    console.log(req);
    const emailAddress = req.body.emailAddress
    const password = req.body.password

    console.log(emailAddress);

    bcrypt.hash(password, 10).then((hash) => {

        console.log(" This is the hash " + hash)

        var loginInfo = db.query(
            "SELECT * FROM user_account WHERE email_address = ? AND password = ?",
            [emailAddress, hash],
            (err, result) => {
                if (err) {
                    res.send({err: err});
                }
                if (result.length >0) {
                    res.send(result)
                } else {
                    res.send({message: "Wrong email address/password combination"})
                }   
            }
        );
            
        console.log(loginInfo)

    })

});

module.exports = router;