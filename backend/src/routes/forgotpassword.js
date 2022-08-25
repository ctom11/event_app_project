const express = require('express');
const db = require("../config/db");
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require("bcrypt");

router.post("/", async (req, res)=> {

    const emailId = req.body.emailId
    const newPassword = Math.random().toString(16).substr(2, 8); 

    const checkEmailAddress = "SELECT * FROM user_account WHERE email_address = ?";
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
                        console.log(err);
                    }
                    console.log(result);
                    res.send(result)
                })
            })

            //send email
            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "eventureprojectsendtest@outlook.com",
                    pass: "Eventureproject100%",
                },
            });

            const options = {
                from: "eventureprojectsendtest@outlook.com",
                to: `${emailId}`, //eventureprojecttest@gmail.com
                subject: "Password reset request",
                text: `Hi, user. Please use this temporary password to login to your account (we strongly recommend you change this is soon as you login. Password: ${newPassword}`
            };

            transporter.sendMail(options, function (err, info) {
                if(err) {
                    console.log(err);
                    return;
                }
                console.log("Sent: " + info.response);
            })
        }
    } catch(err) {
        throw err;
    }

})

module.exports = router;