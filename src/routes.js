const express = require('express');
const routes = express.Router();

const ProjectControllers = require('./Controllers/ProjectControllers')
const imgControlles = require('./Controllers/imgControlles');
const ListControllers = require('./Controllers/ListControllers');
const ProjectsListControllers = require('./Controllers/ProjectsListControllers');
const TestControllers = require('./Controllers/TestControllers');


// routes.get('/images', imgControlles.index);
// routes.post('/images', imgControlles.create);
// routes.delete('/images/:id',imgControlles.delete)

routes.post('/test', TestControllers.create);
routes.get('/project/:slug', ListControllers.index)
routes.get('/projects', ProjectsListControllers.index)



routes.get('/project', ProjectControllers.index)
// routes.post('/project', ProjectControllers.create)
routes.delete('/project/:id', ProjectControllers.delete)


module.exports = routes;