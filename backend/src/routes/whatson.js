const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();


router.get("/", (req, res)=> {

    console.log(req);

    /*const eventId = req.body.eventId
    const eventName = req.body.eventName
    const eventDate = req.body.eventDate
    const eventTime = req.body.eventTime
    const eventLocation = req.body.eventLocation*/

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

module.exports = router;