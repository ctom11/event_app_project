const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();


router.get("/", (req, res)=> {

    console.log(req);

    db.query(
        "SELECT first_name, last_name, email_address, password, user_profile_picture, admin_status FROM user_account",
        (err, rows) => {
            if (err) {
                res.send({err: err});
            } else {
                res.send(rows)
            }
        }
    );

});

router.post("/updateprofilepic", (req, res)=> {

    console.log(req);
    const userProfilePicture = req.body.userProfilePicture
    const userAccountId = req.body.userAccountId

    console.log(userAccountId);

    db.query(
        "UPDATE user_account SET user_profile_picture = ? WHERE user_account_id= ?",
        [userProfilePicture, userAccountId],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.affectedRows >0) {
                res.send({message: "success"})
            } else {
                res.send(result)
            }
        }
    );

});

module.exports = router;