const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello, my dear son Francisco Aguirre');
});
routes.use('/contacts', require('./contacts'));
routes.use('/api-docs', require('./doc'));

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
