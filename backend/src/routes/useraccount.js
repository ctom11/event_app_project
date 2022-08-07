const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const {validateToken} = require("../../authentication/authentication");

/*get all info for a particular user*/
router.get("/byId/:id", validateToken, (req, res)=> {
    const id =  req.user.accountId

    db.normalDb.query(
        "SELECT * FROM user_account WHERE user_account_id = ?",
        [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"No users"})
            }
        });

});

//get account info (no longer used)
router.get("/", (req, res)=> {

    console.log(req);

    db.normalDb.query(
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

//update profile pic
router.post("/updateprofilepic", (req, res)=> {

    console.log(req);
    const userProfilePicture = req.body.userProfilePicture
    const userAccountId = req.body.userAccountId

    console.log(userAccountId);

    db.normalDb.query(
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