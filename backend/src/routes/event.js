const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();

/*get all info about an event*/
router.get("/", (req, res)=> {

    console.log(req);

    db.query(
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

    db.query(
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

/*create new event*/
router.post("/createevent", (req, res)=> {

    console.log(req.body)
    const eventName = req.body.eventName
    const eventDescription = req.body.eventDescription
    const eventDate = req.body.eventDate
    const eventTime = req.body.eventTime
    const eventLocation = req.body.eventLocation
    const eventImage = req.body.eventImage

    console.log(eventName)

    const sqlInsert = "INSERT INTO event (event_name, event_date, event_time, event_location, event_description, event_img) VALUES (?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [eventName, eventDate, eventTime, eventLocation, eventDescription, eventImage], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(result)
    })
});

module.exports = router;