//Server Variables
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//Enviroment variables config
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.DBurl;
//Database Variables
const {MongoClient} = require('mongodb');
const client = new MongoClient(url);

client.connect((err, db) =>{
    if(err) throw err;
    let dbo = db.db('contacts');
    dbo.collection('contacts').find().toArray((err, result) =>{
        if(err) throw err;
        console.log(result);
        db.close();
    });
});

app.use('/', require('./routes'))

app.listen(port, ()=> {
    console.log(`Running on Port ${port}`)
})