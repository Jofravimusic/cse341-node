const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description:
      'API for contacts for cse341 course developed by José Aguirre, following instructions from the lessons',
  },
  host: 'cse341-node-jofravimusic.herokuapp.com/contacts',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpoint = ['./routes/index.js'];

swaggerAutogen(outputFile, endpoint, doc);
