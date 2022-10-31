const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const { validateToken } = require("../authentication/authentication");
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

/*get all info about an event*/
router.get("/", (req, res)=> {

    db.normalDb.query(
        "SELECT * FROM event WHERE admin_approved = 1",
        (err, rows) => {
            if (err) {
                res.send({err: err});
            } else {
                res.send(rows)
            }
        }
    );
});

/*get all info for a particular event*/
router.get("/byId/:id", (req, res)=> {

    const id =  req.params.id

    const getEventInfo = `CALL eventGetInfo(?)`;
    db.normalDb.query(getEventInfo, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            } if (rows.length > 0) {
                res.send(rows[0][0])
            } else {
                res.send({message:"No events found"})
            }
        });
});

/*sort events a-z*/
router.get("/sortaz", (req, res)=> {

    const getSortAZ = `CALL eventSortAZ()`;
    db.normalDb.query(getSortAZ,
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            else if(rows.length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"Couldn't sort events"})
            }
        });
});

/*sort events by date*/
router.get("/sortdate", (req, res)=> {

    const getSortDate = `CALL eventSortByDate()`;
    db.normalDb.query(getSortDate,
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            else if(rows.length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"Couldn't sort"})
            }
        });
});


/*get all events in particular genre*/
router.get("/byGenre/:id", (req, res)=> {

    const id =  req.params.id

    const getGenre =  `CALL eventByGenre(?)`;
    db.normalDb.query(getGenre, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            else if(rows.length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"No events in this genre"})
            }
        });
});

/*get all free events*/
router.get("/free", (req, res)=> {

    const getFreeEvents =  `CALL eventFree()`;
    db.normalDb.query(getFreeEvents,
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"No free events"})
            }
        });
});

/*get all featured events*/
router.get("/featured", (req, res)=> {

    const getFeaturedEvents =  `CALL eventFeatured()`;
    db.normalDb.query(getFeaturedEvents,
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows.length > 0){
                res.send(rows[0])
                return;
            }
            else {
                res.send({message:"No featured events"})
                return;
            }
        });
});

/*add to featured events*/
router.post("/addtofeatured/:id", validateToken, (req, res)=> {

    const id =  req.params.id

    const postFeaturedEvents =  `CALL eventAddToFeatured(?)`;
    db.normalDb.query(postFeaturedEvents, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            res.send(rows[0])
            return;
        });
});

/*stop event from being a featured event*/
router.post("/removefromfeatured/:id", validateToken, (req, res)=> {

    const id =  req.params.id

    const postRemoveFeaturedEvents = `CALL eventRemoveFromFeatured(?)`;
    db.normalDb.query(postRemoveFeaturedEvents, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows[0])
                return;
            }
            else {
                res.send({message:"Event not found"})
                return;
            }
        });
});

/*get all event comments*/
router.get("/comments/:id", (req, res)=> {
    const id =  req.params.id

    const getAllEventComments =  `CALL eventGetComments(?)`;
    db.normalDb.query(getAllEventComments, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if (rows.length > 0) {
                res.send(rows[0])
            }
            else {
                res.send({message:"No comments for this event"})
            }
        });
});

/*create new event*/
router.post("/createevent", upload.single("eventImage"), (req, res)=> {

    const eventName = req.body.eventName
    const eventDescriptionIntro = req.body.eventDescriptionIntro
    const eventDescriptionBody = req.body.eventDescriptionBody
    const eventFree = req.body.eventFree
    const eventTicketLink = req.body.eventTicketLink
    const eventDate = new Date(req.body.eventDate).toISOString().split('T')[0]
    const eventTime = req.body.eventTime
    const eventLocation = req.body.eventLocation
    const eventImage = req.file.filename
    const userId = req.body.userId
    const genreId = req.body.genreId

    const postInsertEvent =  `CALL eventCreate(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.normalDb.query(postInsertEvent, [eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId, genreId], (err, result) => {
        if(err){
            res.status(500).send({error: "Create failed"})
        }
        res.send(result[0]);
    })

});

/*add new event comment*/
router.post("/addcomment", validateToken, (req, res)=> {

    const commentBody = req.body.commentBody
    const commentEventId = req.body.commentEventId
    const commentTime = req.body.commentTime

    const userId = req.user.user_account_id;

    if (Number.isInteger(Number(commentEventId))) {
        const postEventComment =  `CALL eventAddComment(?, ?, ?, ?)`;
        db.normalDb.query(postEventComment, [commentBody, commentTime, commentEventId, userId], (err, result) => {
            if(err){
                res.status(500).send({error: "Failed to add comment"})
            }
            res.send(result[0])
        })
    } else {
        res.send({message:"Parameter validation failed"})
    }
});

/*delete comment*/
router.delete("/comment/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId

    const deleteEventComment =  `CALL eventCommentDelete(?)`;
    db.normalDb.query(deleteEventComment, [commentId], (err, result) => {
        if(err){
            res.status(500).send({error:err});
        }
        res.send(result[0])
    })

})

/*get all events requiring admin approval*/
router.get("/awaitingapproval", (req, res)=> {

    const getEventsAwaitingApproval =  `CALL eventAwaitingApproval()`;
    db.normalDb.query(getEventsAwaitingApproval,
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows.length > 0){
                res.send(rows[0])
                return;
            }
            else {
                res.send({message:"No events currently awaiting approval"})
                return;
            }
        });
});

//approve event
router.post("/approveevent/:id", validateToken, (req, res)=> {

    const id =  req.params.id;

    const postApproveEvent =  `CALL eventApprove(?)`;
    db.normalDb.query(postApproveEvent, [id],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result) {
                res.send({message: "success"})
            } else {
                res.send(result)
            }
        }
    );
});

//decline event
router.delete("/deleteevent/:id", validateToken, (req, res)=> {

    const id =  req.params.id;

    const deleteEvent =  `CALL eventDelete(?)`;
    db.normalDb.query(deleteEvent, [id],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result) {
                res.send({message: "success"})
            }
        }
    );
});

/*increase number of people interested*/
router.post("/increaseinterested/:id", (req, res)=> {

    const id =  req.params.id

    const postIncreaseInterested =  `CALL eventIncreaseInterested(?)`;
    db.normalDb.query(postIncreaseInterested, [id],
        (err, result) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if (result) {
                res.send({message: "success"})
            }
            else {
                res.send({message:"Can't add interested event"})
                return;
            }
        });
});

module.exports = router;