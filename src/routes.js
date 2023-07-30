const express = require('express');
const multer = require('multer');
const routes = express.Router();

const ProjectControllers = require('./Controllers/ProjectControllers')
const imgControlles = require('./Controllers/imgControlles');
const ProjectListControllers = require('./Controllers/ProjectListControllers');
const ProjectsListControllers = require('./Controllers/ProjectsListControllers');
const CreateNewProject = require('./Controllers/createProject');
const multerConfig = require('./config/multer');
const registerControllers = require('./Controllers/RegisterControllers');
const AuthControllers = require('./Controllers/AuthControllers');
const Authmiddle = require('./middleware/auth');
const Briefing = require('./Controllers/Briefing');

// project with images
routes.post('/createNewProject', multer(multerConfig).array("files"), CreateNewProject.create);
routes.get('/project/:slug', ProjectListControllers.index)
routes.get('/projects', ProjectsListControllers.index)

// only Project CRUD
routes.get('/getProjects', ProjectControllers.index)
routes.delete('/getProject/:id', ProjectControllers.delete)
routes.put('/project/:id', ProjectControllers.update)

// only images CRUD
routes.get('/images', imgControlles.index);
routes.post('/images', multer(multerConfig).single("file"), imgControlles.create);
routes.delete('/images/:id',imgControlles.delete)

// register
routes.post('/register', registerControllers.create);
routes.get('/users', Authmiddle, registerControllers.index);

// Authenticate / Login
routes.post('/connect/auth', AuthControllers.index)
routes.get('/connect/auth/user', Authmiddle, AuthControllers.getUserInfo)

// briefing
routes.post('/create-briefing', Briefing.createBriefing)
routes.get('/briefings', Briefing.getBriefing)
routes.put('/briefing/:id', Briefing.updateBriefing)

module.exports = routes;

