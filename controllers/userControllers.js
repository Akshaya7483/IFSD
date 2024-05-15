const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports = {
    registerForm: (req, res) => {
        res.render('register');
    },
    register: (req, res) => {
        const { username, email, password } = req.body;
        // Hash the password before saving it
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            User.createUser(username, email, hashedPassword, (err, userId) => {
                if (err) {
                    res.status(500).send(err.message);
                    return;
                }

                res.redirect(`/create/${userId}`);
            });
        });
    },
    loginForm: (req, res) => {
        res.render('login');
    },
    login: (req, res) => {
        const { username, password } = req.body;
        User.getUserByUsername(username, (err, user) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            if (!user) {
                res.status(404).send('User not found');
                return;
            }
            // Check if passwords match
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.status(500).send(err.message);
                    return;
                }
                if (result) {
                    req.session.userId = user.id; // Store user ID in session
                    res.redirect(`/dashboard`); // Redirect to dashboard or any other route
                } else {
                    res.status(401).send('Incorrect password');
                }
            });
        });
    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                res.status(500).send(err.message);
                return;
            }
            res.redirect('/');
        });
    }
};