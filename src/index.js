const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');
const cors = require('cors');

const config = require('./config/config');

const server = app.listen(config.port);

app.use(express.static(path.join(__dirname + '/views')));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

server.on("listening", () => {
    console.log('Application Listening at Port ' + config.port);
});