const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const server = require("http").createServer(app);


app.use(cors());
app.use(express.json());

var signupRoute = require("./routes/signup");
app.use("/signup", signupRoute);
var loginRoute = require("./routes/login");
app.use("/login", loginRoute);
var whatsonRoute = require("./routes/whatson");
app.use("/whatson", whatsonRoute);
var eventRoute = require("./routes/event");
app.use("/event", eventRoute);
var useraccountRoute = require("./routes/useraccount");
app.use("/useraccount", useraccountRoute);

server.listen(3001, () => console.log("Server started!"));

module.exports = app;