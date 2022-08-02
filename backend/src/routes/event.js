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
        "SELECT event_id FROM event_genre WHERE genre_id = ?",
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




/*create new event*/
router.post("/createevent", (req, res)=> {

    console.log(req.body)
    const eventName = req.body.eventName
    const eventDescriptionIntro = req.body.eventDescriptionIntro
    const eventDescriptionBody = req.body.eventDescriptionBody
    const eventTicketLink = req.body.eventTicketLink
    const eventDate = req.body.eventDate
    const eventTime = req.body.eventTime
    const eventLocation = req.body.eventLocation
    const eventImage = req.body.eventImage

    console.log(eventName)

    const sqlInsert = "INSERT INTO event (event_name, event_date, event_time, event_location, event_description, event_img) VALUES (?, ?, ?, ?, ?, ?)"
    db.normalDb.query(sqlInsert, [eventName, eventDate, eventTime, eventLocation, eventDescriptionIntro, eventDescriptionBody, eventTicketLink, eventImage], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result)
    })
});

module.exports = router;