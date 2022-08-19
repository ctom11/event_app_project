const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const {validateToken} = require("../authentication/authentication");

// for comparing input password with hashed password in db
const bcrypt = require("bcrypt");

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

//update bio
router.post("/updatebio/:id", validateToken, (req, res)=> {

    console.log(req);
    const userBio = req.body.userBio
    const id =  req.params.id;

    db.normalDb.query(
        "UPDATE user_account SET user_bio = ? WHERE user_account_id= ?",
        [userBio, id],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.affectedRows) {
                res.send({message: "success"})
            } else {
                res.send(result)
            }
        }
    );
});

//update name
router.post("/changename/:id", validateToken, (req, res)=> {

    console.log(req);
    const updatedFirstName = req.body.updatedFirstName
    const updatedLastName = req.body.updatedLastName
    const id =  req.params.id;

    db.normalDb.query(
        "UPDATE user_account SET first_name = ?, last_name = ? WHERE user_account_id= ?",
        [updatedFirstName, updatedLastName, id],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.affectedRows) {
                res.send({message: "success"})
            } else {
                res.send(result)
            }
        }
    );
});

//update password
router.post("/changepassword/:id", validateToken, (req, res)=> {

    console.log(req);
    const updatedPassword = req.body.updatedPassword
    const id =  req.params.id;

        /*bcrypt hashes new passwords as they are added to the db*/
        bcrypt.hash(updatedPassword, 10).then((hash) => {

    
            const sqlUpdate = "UPDATE user_account SET password = ? WHERE user_account_id = ?"

            db.normalDb.query(sqlUpdate, [hash, id], (err, result) => {
                if(err){
                    console.log(err);
                }
                console.log(result);
                res.send(result)
            })
        })
});

//get user's interested events
router.get("/myevents/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    db.normalDb.query(
        "SELECT event.event_id, event.event_name, event.event_date, event.event_time, event.event_img FROM event JOIN user_events_interested on user_events_interested.event_id = event.event_id WHERE user_events_interested.user_account_id = ?",
        [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"This user isn't interested in any events"})
            }
        });

});

//get user's posted events
router.get("/postedevents/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    db.normalDb.query(
        "SELECT event.event_id, event.event_name, event.event_date, event.event_time, event.event_img FROM event WHERE user_account_id = ?",
        [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"This user isn't interested in any events"})
            }
        });

});

//delete user account
router.delete("/deleteaccount/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    db.normalDb.query(
        "DELETE FROM `user_account` WHERE user_account_id = ?",
        [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"Can't delete account"})
            }
        });

});


module.exports = router;