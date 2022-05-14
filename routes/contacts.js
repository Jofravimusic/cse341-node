const routes = require('express').Router();
const { ObjectId } = require('mongodb');

const dbconnection = require('../model/dbconnection');

// Get all Contacts
routes.get('/', (req, res) => {
  const contacts = dbconnection.getContacts().find();

  contacts.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('All contacts were retrieved');
  });
});

// Create a Contact
routes.post('/', (req, res) => {
  const contact = dbconnection.getContacts().insertOne({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  });

  contact.then((document) => {
    if (!document.insertedId) return res.status(404).send(`No contact added`);
    res.status(201).redirect(`/contacts/${document.insertedId}`);
    console.log(`Contact was created with id: ${document.insertedId}`);
  });
});

// Get a Contact by Id
routes.get('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = dbconnection.getContacts().findOne({ _id: contactId });

  contact.then((document) => {
    if (!document)
      return res.status(404).send(`No contact with id: ${req.params.id}`);
    res.status(200).json(document);
    console.log(`Contact was retrieved with id: ${req.params.id}`);
  });
});

// Update a Contact by Id
routes.put('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = dbconnection.getContacts().updateOne(
    {
      _id: contactId,
    },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      },
    }
  );

  contact.then((document) => {
    if (document.matchedCount >= 1) {
      if (document.modifiedCount < 1)
        return res
          .status(404)
          .send('Contact could not be updated, nothing was changed');
      res.status(201).json(document);
      console.log(`Contact was updated with id: ${req.params.id}`);
    } else {
      res.status(404).send(`Contact was not found with id: ${req.params.id}`);
    }
  });
});

// Delete a Contact by Id
routes.delete('/:id', (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = dbconnection.getContacts().deleteOne({ _id: contactId });

  contact.then((document) => {
    if (document.deletedCount < 1)
      return res
        .status(404)
        .send(
          `No contact with id: ${req.params.id} or deleted was not processed`
        );
    res.status(200).json(document);
    console.log(`Contact was deleted with id: ${req.params.id}`);
  });
});

routes.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://cse341-contacts-frontend.netlify.app'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

module.exports = routes;
