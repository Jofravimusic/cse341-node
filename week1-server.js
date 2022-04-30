//Server Variables
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dbconnection = require("./model/dbconnection");

dbconnection.connectDatabase();

app.use('/', require('./routes'))

app.listen(port, ()=> {
    console.log(`Running on Port ${port}`)
})