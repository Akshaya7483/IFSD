const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const userController = require('./controllers/userControllers');
const storageController = require('./controllers/storageController');
const diaryController = require('./controllers/appController');
const appController = require('./controllers/appController');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', userController.registerForm);
app.post('/register', userController.register);
app.get('/create/:userId',storageController.createdatabase)
app.get('/create_tb/:appname',appController.create_tb);
app.get('/login', userController.loginForm);
app.post('/login', userController.login);
app.get('/logout', userController.logout);
app.get('/dashboard',storageController.dashboard)
app.post('/chatroom/create/:userI/:username',storageController.create)
app.get('/chatroom/create/:userI/:username',storageController.create)
app.get('/chatroom/:userI',storageController.chatroom)
app.post('/submitDiary/:userId/:date/:title/:data',appController.diary_entry)
app.post('/chatview/:userId/:username',storageController.chatview)
app.post('/insert/:userId/:username/:content',storageController.insert)
app.post('/reload/:userId/:username/:msg',storageController.reload)


const port = 1300;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`)
});


