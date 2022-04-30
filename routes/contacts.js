const routes = require('express').Router();
const dbconnection = require("../model/dbconnection");

routes.get('/', (req, res) => {
    dbconnection.getContacts().find().toArray((err, result) =>{
        if(err) throw err;
        res.json(result);
        console.log("Contacts being retrieved");
    });
    
});

module.exports = routes;