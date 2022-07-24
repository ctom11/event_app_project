const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();


router.post("/", (req, res)=> {

    console.log(req);
    const emailAddress = req.body.emailAddress
    const password = req.body.password

    console.log(emailAddress);

    db.query(
        "SELECT * FROM user_account WHERE email_address = ? AND password = ?",
        [emailAddress, password],
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

});

module.exports = router;