const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.send('Hello, my dear son Francisco Aguirre');
});
routes.use('/contacts', require("./contacts"));

module.exports = routes;