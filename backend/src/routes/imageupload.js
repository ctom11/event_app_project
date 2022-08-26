const { application } = require('express');
const express = require('express');
const db = require("../config/db");
const router = express.Router();
const path = require('path');

const multer = require('multer');

//storage is where all file specifications are determined
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../event_images')
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

//middleware
const upload = multer({storage: storage})

/*upload event img to db*/
router.post("/eventimg", upload.single("eventimage"), (req, res)=> {
    res.send("Image uploaded");
});


module.exports = router;