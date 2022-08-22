const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const { validateToken } = require("../authentication/authentication");

/*get all info about an event*/
router.get("/", (req, res)=> {

    console.log(req);

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

    const getEventInfo = "SELECT * FROM event WHERE event_id = ?";
    db.normalDb.query(getEventInfo, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            else if(rows){
                res.send(rows[0])
            }
            else {
                res.send({message:"No event"})
            }
        });
});

/*sort events a-z*/
router.get("/sortaz", (req, res)=> {

    const getSortAZ = "SELECT * FROM event WHERE admin_approved = 1 ORDER BY event_name ASC;";
    db.normalDb.query(getSortAZ,
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            else if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"Couldn't sort"})
            }
        });
});

/*sort events by date*/
router.get("/sortdate", (req, res)=> {

    const getSortDate = "SELECT * FROM event WHERE admin_approved = 1 ORDER BY event_date";
    db.normalDb.query(getSortDate,
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            else if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"Couldn't sort"})
            }
        });
});


/*get all events in particular genre*/
router.get("/byGenre/:id", (req, res)=> {

    const id =  req.params.id

    const getGenre = "SELECT genre_id, event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event WHERE genre_id = ? AND admin_approved = 1";
    db.normalDb.query(getGenre, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            else if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"No events in this genre"})
            }
        });
});

/*get all free events*/
router.get("/free", (req, res)=> {

    const getFreeEvents = "SELECT genre_id, event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event WHERE event.event_free = 1 AND admin_approved = 1";
    db.normalDb.query(getFreeEvents,
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"No free events"})
            }
        });
});

/*get all featured events*/
router.get("/featured", (req, res)=> {

    const getFeaturedEvents = "SELECT event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event WHERE event.event_featured = 1 AND event.admin_approved = 1";
    db.normalDb.query(getFeaturedEvents,
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
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

    const postFeaturedEvents = "UPDATE event SET event_featured = 1 WHERE event_id = ?";
    db.normalDb.query(postFeaturedEvents, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
                return;
            }
            else {
                res.send({message:"No featured events"})
                return;
            }
        });
});

/*stop event from being a featured event*/
router.post("/removefromfeatured/:id", validateToken, (req, res)=> {

    const id =  req.params.id

    const postRemoveFeaturedEvents = "UPDATE event SET event_featured = 0 WHERE event_id = ?";
    db.normalDb.query(postRemoveFeaturedEvents, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
                return;
            }
            else {
                res.send({message:"No featured events"})
                return;
            }
        });
});


/*get all event comments*/
router.get("/comments/:id", (req, res)=> {
    const id =  req.params.id

    const getAllEventComments = "SELECT comment_id, event_comment_body, event_comment_time, first_name, last_name, user_profile_picture FROM comments JOIN user_account ON comments.user_account_id = user_account.user_account_id WHERE comments.comment_event_id = ?";
    db.normalDb.query(getAllEventComments, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows){
                res.send(rows)
            }
            else {
                res.send({message:"No comments for this event"})
            }
        });
});

/*create new event*/
router.post("/createevent", (req, res)=> {

    console.log(req.body)
    const eventName = req.body.eventName
    const eventDescriptionIntro = req.body.eventDescriptionIntro
    const eventDescriptionBody = req.body.eventDescriptionBody
    const eventFree = req.body.eventFree
    const eventTicketLink = req.body.eventTicketLink
    const eventDate = req.body.eventDate
    const eventTime = req.body.eventTime
    const eventLocation = req.body.eventLocation
    const eventImage = req.body.eventImage
    const userId = req.body.userId
    const genreId = req.body.genreId

    console.log(eventName)

    const postInsertEvent = "INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, user_account_id, genre_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.normalDb.query(postInsertEvent, [eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, userId, genreId], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result);
    })

});

/*add new event comment*/
router.post("/addcomment", validateToken, (req, res)=> {

    console.log(req.body)
    const commentBody = req.body.commentBody
    const commentEventId = req.body.commentEventId
    const commentTime = req.body.commentTime

    const userId = req.user.user_account_id;

    console.log(commentBody)

    const postEventComment = "INSERT INTO comments (event_comment_body, event_comment_time, comment_event_id, user_account_id) VALUES (?, ?, ?, ?)"
    db.normalDb.query(postEventComment, [commentBody, commentTime, commentEventId, userId], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result)
    })
});

/*delete comment*/
router.delete("/comment/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId

    const deleteEventComment = "DELETE FROM `comments` WHERE comment_id = ?"
    db.normalDb.query(deleteEventComment, [commentId], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result)
    })

})

/*get all events requiring admin approval*/
router.get("/awaitingapproval", (req, res)=> {

    const getEventsAwaitingApproval = "SELECT event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img, genre_id FROM event WHERE event.admin_approved = 0";
    db.normalDb.query(getEventsAwaitingApproval,
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
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

    const postApproveEvent = "UPDATE event SET admin_approved = 1 WHERE event_id= ?";
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

    const deleteEvent = "DELETE FROM event WHERE event_id= ?";
    db.normalDb.query(deleteEvent, [id],
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

/*increase number of people interested*/
router.post("/increaseinterested/:id", (req, res)=> {

    const id =  req.params.id

    const postIncreaseInterested = "UPDATE event SET event_interested = event_interested + 1 WHERE event_id = ?";
    db.normalDb.query(postIncreaseInterested, [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
                return;
            }
            if(rows){
                res.send(rows)
                return;
            }
            else {
                res.send({message:"Can't add interested event"})
                return;
            }
        });
});

module.exports = router;