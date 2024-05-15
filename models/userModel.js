const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

module.exports = {
    createUser: (username, email, password, callback) => {
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, password],
            function(err) {
                if (err) {
                    callback(err);
                    return;
                }
                callback(null, this.lastID);
            });
    },
    getUserByUsername: (username, callback) => {
        db.get('SELECT id, username, email, password FROM users WHERE username = ?', [username], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, row);
        });
    },
    
    getUserByEmail: (email, callback) => {
        db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, row);
        });
    },
    getUserById: (id, callback) => {
        db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, row);
        });
    }
    // Add more functions as needed
};