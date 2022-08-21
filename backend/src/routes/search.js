const express = require('express');
const db = require("../config/db");
const router = express.Router();

router.get("/:searchQuery", (req, res)=> {

    const searchQuery = req.params.searchQuery
    console.log(req);

    const getSearchResults = `SELECT event.event_name, event.event_date, event.event_time, event.event_img, event.event_location, event.event_id, genre.genre_name FROM event JOIN genre ON genre.genre_id = event.genre_id WHERE genre.genre_name LIKE '%${searchQuery}%' OR event.event_name LIKE '%${searchQuery}%' OR event.event_location LIKE '%${searchQuery}%' GROUP BY event.event_id`;
    db.normalDb.query(getSearchResults,
        (err, rows) => {
            if (err) {
                res.send({err: err});
            } if (rows) {
                res.send(rows)
            }
        }
    );

});

module.exports = router;