const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const userController = require('./controllers/userControllers');
const storageController = require('./controllers/storageController');


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
app.get('/login', userController.loginForm);
app.post('/login', userController.login);
app.get('/chatroom/:userI',storageController.chatroom)
app.post('/chatroom/:userI',storageController.chatroom)
app.get('/logout', userController.logout);
app.post('/chatroom/create/:userI/:username',storageController.create)
app.post('/chatview/:userId/:username',storageController.chatview)
app.post('/insert/:userId/:username/:content',storageController.insert)
app.post('/reload/:userId/:username',storageController.reload)
app.post('/diary/:userId',storageController.diary)
app.post('/todo',storageController.todo)
app.post('/addDiary/:userId/:date/:title/:entry',storageController.adddiary)

const port = 7000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`)
});


