const express = require('express');
const db = require("../config/db");
const router = express.Router();

router.get("/", (req, res)=> {

    console.log(req);

    db.normalDb.query(
        "",
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