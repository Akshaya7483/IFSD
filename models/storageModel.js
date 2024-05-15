const {createdatabase}=require('../controllers/storageController');
const { create_tb } = require('../controllers/storageController');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');
module.exports = {
    createdatabase:(userId)=>{
        const db=new sqlite3.Database(`./storage/${userId}.sqlite`)
    },
    create_tb:(appname,userId)=>{
        const dbPath = path.join(__dirname, `../storage/${userId}.sqlite`);
        const db = new sqlite3.Database(dbPath);

        const createTableSQL = `CREATE TABLE IF NOT EXISTS ${appname} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT
        )`;

        db.run(createTableSQL, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });

        db.close();
    }
}
