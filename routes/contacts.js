const routes = require('express').Router();
const dbconnection = require("../model/dbconnection");
const ObjectId = require('mongodb').ObjectId;
routes.get('/', (req, res) => {
    
    let contacts = dbconnection.getContacts().find();

    contacts.toArray().then((documents) =>{
        res.status(200).json(documents);
        console.log("All contacts were retrieved");
    });
    
});

routes.get('/:id', (req, res) => {
    
    let contactId = new ObjectId(req.params.id)
    let contact = dbconnection.getContacts().findOne({_id : contactId});

    contact.then((document) =>{
        if(!document) return res.status(200).send(`No contact with id: ${req.params.id}`);
        res.status(200).json(document);
        console.log(`Contact was retrieved with id: ${req.params.id}`);
    });
    
});

module.exports = routes;