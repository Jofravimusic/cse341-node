const routes = require('express').Router();

//Enviroment variables config
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.DBurl;
//Database Variables
const {MongoClient} = require('mongodb');
const client = new MongoClient(url);

routes.get('/', (req, res) => {

    client.connect((err, db) =>{
        if(err) throw err;
        let dbo = db.db('contacts');
        dbo.collection('contacts').find().toArray((err, result) =>{
            if(err) throw err;
            res.json(result);
            db.close();
        });
    });
});

module.exports = routes;