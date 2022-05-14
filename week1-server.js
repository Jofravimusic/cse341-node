// Server Variables
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const dbconnection = require('./model/dbconnection');

dbconnection.connectDatabase();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Content-Type', 'Application/json');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});
app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
