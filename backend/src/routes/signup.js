const express = require('express');
const db = require("../config/db");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/", (req, res)=> {

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const emailAddress = req.body.emailAddress
    const password = req.body.password

    /*bcrypt hashes new passwords as they are added to the db*/
    bcrypt.hash(password, 10).then((hash) => {

        const postRegistration = `CALL userRegistration(?, ?, ?, ?)`;
        db.normalDb.query(postRegistration, [firstName, lastName, emailAddress, hash], (err, result) => {
            if(err){
                res.status(500).send({message:"Reg failure"})
            }
            res.send(result)
        })
    })
});

module.exports = router;