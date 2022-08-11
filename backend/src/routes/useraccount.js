const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const {validateToken} = require("../authentication/authentication");

/*get all info for a particular user*/
router.get("/byId/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

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

router.post("/updateprofilepic/:id", validateToken, (req, res)=> {

    console.log(req);
    const userProfilePicture = req.body.userProfilePicture
    const id =  req.params.id;

    db.normalDb.query(
        "UPDATE user_account SET user_profile_picture = ? WHERE user_account_id= ?",
        [userProfilePicture, id],
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

//add event to user's 'events you're interested in'
router.post("/addToInterested", validateToken, (req, res)=> {

    const eventId = req.body.eventId
    const userId = req.user.user_account_id;

    console.log(req);

    db.normalDb.query(
        "INSERT INTO `user_events_interested` (`user_account_id`, `event_id`) VALUES (?, ?);",
        [userId, eventId],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            } else {
                res.send(rows)
            }
        }
    );

});



module.exports = router;