const express = require('express');
const db = require("../config/db");
const router = express.Router();

router.get("/:searchQuery", (req, res)=> {

    const searchQuery = req.params.searchQuery;
    
    const getSearchResults = `CALL searchResults(?)`;
    db.normalDb.query(getSearchResults, [searchQuery],
        (err, rows) => {
            if (err) {
                res.send({err: err});
            } if (rows.length > 0) {
                res.send(rows[0])
            } else {
                res.send({message:"No search results"})
            }
        }
    );

});

module.exports = router;