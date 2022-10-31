const express = require('express');
const db = require("../config/db");
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

router.post("/", async (req, res)=> {

    const emailId = req.body.emailId
    const newPassword = Math.random().toString(16).substr(2, 8); 

    const checkEmailAddress =  `CALL userForgotPassword(?)`;
    try {
        const [rows, fields] = await db.promiseDb.query(checkEmailAddress,[emailId]);
        if(rows.length <= 0){
            res.send({error: "Incorrect email"})
            return;
        } if(rows) {

            //change the password
            bcrypt.hash(newPassword, 10).then((hash) => {
                const resetPassword = "UPDATE user_account SET password = ? WHERE email_address= ?";
                db.normalDb.query(resetPassword, [hash, emailId], (err, result) => {
                    if(err){
                        res.status(500).send({error: "Failed to reset password"})
                    }
                    res.send(result)
                })
            })

            //send email
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    // user: //email,
                    // pass: //password
                },
            });

            const options = {
                // from: PROJECTNAME
                to: `${emailId}`,
                subject: "Password reset request",
                text: `Hi there. Please use this temporary password to login to your account (we strongly recommend you change this is soon as you login). Password: ${newPassword}`
            };

            transporter.sendMail(options, function (err, info) {
                if(err) {
                    res.status(500).send({error: "Failed to send email"})
                    return;
                }
            })
        }
    } catch(err) {
        throw err;
    }

})

module.exports = router;