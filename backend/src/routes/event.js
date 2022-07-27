const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();


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

router.post("/createevent", (req, res)=> {

    const eventName = req.body.eventName
    const eventDescription = req.body.eventDescription
    const eventDate = req.body.eventDate
    const eventTime = req.body.eventTime
    const eventLocation = req.body.eventLocation
    const eventImage = req.body.eventImage

    const sqlInsert = "INSERT INTO event (event_name, event_date, event_time, event_location, event_description, event_img) VALUES (?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [eventName, eventDescription, eventDate, eventTime, eventLocation, eventImage], (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
    })
});

module.exports = router;