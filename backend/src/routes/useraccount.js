const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const {validateToken} = require("../authentication/authentication");
const path = require('path');
const multer = require('multer');

//storage is where all file specifications are determined
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../event_images/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

//middleware
const upload = multer({storage: storage})

// for comparing input password with hashed password in db
const bcrypt = require("bcrypt");

/*get all info for a particular user*/
router.get("/byId/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    const getUserInfo = `CALL userGetInfo(?)`;
    db.normalDb.query(getUserInfo, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
                res.send(rows[0][0])
            }
            else {
                res.send({message:"No users"})
            }
        });

});

//get account info (no longer used)
router.get("/", (req, res)=> {

    const getAccountInfo = "SELECT first_name, last_name, email_address, password, user_profile_picture, admin_status FROM user_account";
    db.normalDb.query(getAccountInfo,
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
router.post("/updateprofilepic/:id", validateToken, upload.single("userProfilePicture"), (req, res)=> {

    const userProfilePicture = req.file.filename
    const id =  req.params.id;

    const postProfilePic = `CALL userUpdateProfilePicture(?, ?)`;
    db.normalDb.query(postProfilePic, [userProfilePicture, id],
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

//update bio
router.post("/updatebio/:id", validateToken, (req, res)=> {

    const userBio = req.body.userBio
    const id =  req.params.id;

    const postUpdateBio = `CALL userUpdateBio(?, ?)`;
    db.normalDb.query(postUpdateBio, [userBio, id],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.affectedRows) {
                res.send({message: "success"})
            } else {
                res.send({message:"Can't update bio"})
            }
        }
    );
});

//update name
router.post("/changename/:id", validateToken, (req, res)=> {

    const updatedFirstName = req.body.newFirstName
    const updatedLastName = req.body.newLastName
    const id =  req.params.id;

    const postUpdateName = `CALL userChangeName(?, ?, ?)`;
    db.normalDb.query(postUpdateName, [updatedFirstName, updatedLastName, id],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.affectedRows) {
                res.send({message: "success"})
            } else {
                res.send({message:"Can't update name"})
            }
        }
    );
});

//update password
router.post("/changepassword/:id", validateToken, (req, res)=> {

    const updatedPassword = req.body.updatedPassword
    const id =  req.params.id;

    /*bcrypt hashes new passwords as they are added to the db*/
    bcrypt.hash(updatedPassword, 10).then((hash) => {

        const postUpdatePassword = `CALL userChangePassword(?, ?)`;
        db.normalDb.query(postUpdatePassword, [hash, id], (err, result) => {
            if(err){
                res.status(500).send({error: "Failed to update password"})
            }
            res.send(result)
        })
    })
});

//get user's interested events
router.get("/myevents/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    const getInterestedEvents = `CALL userInterestedEvents(?)`;
    db.normalDb.query(getInterestedEvents, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows[0].length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"This user isn't interested in any events"})
            }
        });

});

//get user's posted events
router.get("/postedevents/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    const getPostedEvents = `CALL userPostedEvents(?)`;
    db.normalDb.query(getPostedEvents, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows[0].length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"This user hasn't posted any events"})
            }
        });

});

//delete user account
router.delete("/deleteaccount/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    const deleteUserAccount = `CALL userDeleteAccount(?)`;
    db.normalDb.query(deleteUserAccount, [id],
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

//delete user's event
router.delete("/deleteevent/:id", validateToken, (req, res)=> {
    const id =  req.params.id;

    const deleteUserEvent = `CALL userDeleteEvent(?)`;
    db.normalDb.query(deleteUserEvent, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});   
                return;
            }
            if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"Can't delete event"})
            }
        });

});

/*add to interested events*/
router.post("/addtointerested/:id", validateToken, (req, res)=> {

    const id =  req.params.id
    const eventId = req.body.eventId

    const postInterestedEvents = `CALL userAddInterested(?, ?)`;
    db.normalDb.query(postInterestedEvents, [id, eventId],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send({message: "success"})
                return;
            }
            else {
                res.send({message:"Can't add interested event"})
                return;
            }
        });
});

module.exports = router;