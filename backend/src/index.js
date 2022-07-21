const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const server = require("http").createServer(app);


app.use(cors());
app.use(express.json());

var signupRoute = require("./routes/signup");
app.use("/signup", signupRoute);

server.listen(3001, () => console.log("Server started!"));

module.exports = app;