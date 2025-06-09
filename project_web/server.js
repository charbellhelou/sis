'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var express = require('express');
var app = express();
var path = require('path');
var connect = require('./DBconnection.js');
var HTMLpath = path.join(__dirname, "Public");


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const middleware = require('./Services/middleware.js');
app.use(middleware);

var UserService = require('./Services/userService.js');
var UserController = require('./Controllers/userController.js');
var UserRepository = require('./Repository/userRepo.js');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

var CourseService = require('./Services/courseService.js');
var CourseController = require('./Controllers/courseController.js');
var CourseRepository = require('./Repository/courseRepository.js');

const courseRepository = new CourseRepository();
const courseService = new CourseService(courseRepository);
const courseController = new CourseController(courseService);


app.get('/login', (req, res) => courseController.login(req, res));

app.post("/login", (req, res) => userController.login(req, res));
app.post("/register", middleware.isAuthenticated, (req, res) => userController.registerUser(req, res));
app.get('/', middleware.isAuthenticated, async (req, res) => courseController.hp(req, res));

app.get('/admin', middleware.isAuthenticated, async (req, res) => courseController.adminmenu(req, res));

app.post('/checkforaddcourse', middleware.isAuthenticated, async (req, res) => courseController.checkforaddcourse(req, res));
app.post('/checkfordropcourse', middleware.isAuthenticated, async (req, res) => courseController.checkfordroppedcourse(req, res));
app.get('/addcourse', middleware.isAuthenticated, async (req, res) => courseController.displaystdaddcourses(req, res));

app.get('/dropcourseadmin', middleware.isAuthenticated, async (req, res) => courseController.getcoursesnames(req, res));
app.get('/showcourse', middleware.isAuthenticated, async (req, res) => courseController.displaystdcourses(req, res));
app.get('/showenrolledcourse', middleware.isAuthenticated, async (req, res) => courseController.showenrolledcourse(req, res));

app.get('/dropcourse', middleware.isAuthenticated, async (req, res) => courseController.showdropcourses(req, res));
app.post("/addcoursetodb", middleware.isAuthenticated, async (req, res) => courseController.enroll(req, res));
app.post("/dropcoursedromdb", middleware.isAuthenticated, async (req, res) => courseController.dropcourse(req, res));
app.post("/coursedropadmin", middleware.isAuthenticated, async (req, res) => courseController.dropcourse1(req, res));
app.post("/additionofcourse", middleware.isAuthenticated, async (req, res) => courseController.addcourse(req, res));
app.get('/register', middleware.isAuthenticated, async (req, res) => courseController.showreg(req, res));
app.get('/student', middleware.isAuthenticated, async (req, res) => courseController.std(req, res));
app.get('/addnewcourse', middleware.isAuthenticated, async (req, res) => courseController.courseaddpage(req, res));
app.get('/changegrade1', middleware.isAuthenticated, async (req, res) => courseController.changegrade1(req, res));
app.post("/dbchangegrade", middleware.isAuthenticated, (req, res) => courseController.dbchangegrade(req, res));
app.post('/getstudentsforcourse', middleware.isAuthenticated, async (req, res) => courseController.getstudentsforcourse(req, res));



app.listen(port);