const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res)=> {

    console.log(req);

    db.query(
        "SELECT event_name, event_date, event_time, event_location FROM event",
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