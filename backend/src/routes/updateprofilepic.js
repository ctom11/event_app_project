const express = require('express');
const db = require("../config/db");
const router = express.Router();

router.post("/", (req, res)=> {

    console.log(req);
    const userProfilePicture = req.body.userProfilePicture
    const userAccountId = req.body.userAccountId

    console.log(userAccountId);

    db.query(
        "UPDATE `user_account` SET `user_profile_picture`= ? WHERE `user_account_id`= ?",
        [userProfilePicture, userAccountId],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.length >0) {
                res.send(result)
            } else {
                res.send({message: "pic not changed"})
            }
        }
    );

});

module.exports = router;