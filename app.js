const express = require('express');
const sequelize = require("./db/database");
const router = require('./Routes/route');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));
sequelize.sync().then(result => {
    app.listen(3000);

}).catch(err => {
    console.log(err);
})