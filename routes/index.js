const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Hello, my dear son Francisco Aguirre');
});

module.exports = routes;