const winston = require('winston');
const express = require('express');

const app = express();

require("./startup/logging");
require("./startup/routes")(app);
require('./startup/db')();
require('./startup/config')();
require("./startup/validation")();

app.get("/", (req, res) => {
    res.send("Hello world")
});

const port = process.env.PORT || 3000;
app.listen(port, () => { winston.info(`running on the port ${port}`) });