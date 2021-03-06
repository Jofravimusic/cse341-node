const routes = require('express').Router();
const { ObjectId } = require('mongodb');
const cors = require('cors');
const { inputValidation, results } = require('../validation');

const dbconnection = require('../model/dbconnection');

routes.use(cors());

routes.use((req, res, next) => {
  const corsWhitelist = [
    'https://cse341-contacts-frontend.netlify.app',
    'http://localhost:5500/week10',
    'https://jofravimusic.github.io/WDD330-Jose-Aguirre/week10',
    'http://127.0.0.1:5500/week10',
  ];
  if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }

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

// Get all Contacts
routes.get('/', (req, res) => {
  const contacts = dbconnection.getContacts().find();

  contacts.toArray().then((documents) => {
    res.status(200).json(documents);
    console.log('All contacts were retrieved');
  });
});

// Create a Contact
routes.post('/', inputValidation, (req, res) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const _result = results(req);
    if (!_result.isEmpty()) {
      return res.status(400).json({ errors: _result.array() });
    }

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
  } catch (error) {
    res.status(404).send(error);
  }
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

module.exports = routes;
