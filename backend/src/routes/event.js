const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();

/*get all info about an event*/
router.get("/", (req, res)=> {

    console.log(req);

    db.normalDb.query(
        "SELECT * FROM event",
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

    db.normalDb.query(
        "SELECT * FROM event WHERE event_id = ?",
        [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
                res.send(rows[0])
            }
            else {
                res.send({message:"No event"})
            }
        });
});


/*get all events in particular genre*/
router.get("/byGenre/:id", (req, res)=> {
    const id =  req.params.id

    db.normalDb.query(
        "SELECT genre_id, event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event INNER JOIN event_genre ON event.event_id=event_genre.event_id WHERE event_genre.genre_id = ?",
        [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
                res.send(rows)
            }
            else {
                res.send({message:"No events in this genre"})
            }
        });
});


/*get all free events*/
router.get("/free", (req, res)=> {

    db.normalDb.query(
        "SELECT genre_id, event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event INNER JOIN event_genre ON event.event_id=event_genre.event_id WHERE event.event_free = 1",
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
                res.send(rows)
            }
            else {
                res.send({message:"No free events"})
            }
        });
});

/*get all featured events*/
router.get("/featured", (req, res)=> {

    db.normalDb.query(
        "SELECT event.event_id, event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_ticket_link, event_img FROM event WHERE event.event_featured = 1",
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
                res.send(rows)
            }
            else {
                res.send({message:"No featured events"})
            }
        });
});

/*get all event comments*/
router.get("/comments/:id", (req, res)=> {
    const id =  req.params.id

    db.normalDb.query(
        "SELECT comments.comment_id, event_comments.event_comment_id, comments.event_comment_header, comments.event_comment_body, comments.event_comment_date, comments.event_comment_time FROM comments INNER JOIN event_comments ON comments.comment_id=event_comments.event_comment_id WHERE event_comments.event_id = ?",
        [id],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            }
            if(rows.length > 0){
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
    const eventFeatured = req.body.eventFeatured

    console.log(eventName)

    const sqlInsert = "INSERT INTO event (event_name, event_date, event_time, event_location, event_description_intro, event_description_body, event_free, event_ticket_link, event_img, event_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    db.normalDb.query(sqlInsert, [eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventFree, eventTicketLink, eventImage, eventFeatured], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result)
    })
});

/*add new event comment*/

router.post("/addcomment/:id", (req, res)=> {
    const id =  req.params.id

    console.log(req.body)
    const commentHeader = req.body.commentHeader
    const commentBody = req.body.commentBody

    console.log(commentHeader)

    const sqlInsert = "INSERT INTO comments (event_comment_header, event_comment_body, event_comment_time, comment_event_id) VALUES (?, ?, ?, NOW())"
    db.normalDb.query(sqlInsert, [commentHeader, commentBody, id], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result)
    })
});

module.exports = router;