const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

module.exports = {
    createdatabase:(id)=>{
        const db=new sqlite3.Database(`./storage/${id}.sqlite`)
    },
    create_tb:(appname,userId)=>{
        const con= new sqlite3.Database(`./storage/${userId}.sqlite`)
        const createTableSQL = `CREATE TABLE ${appname} (id INTEGER PRIMARY KEY AUTOINCREMENT,data TEXT)`;
        con.run(createTableSQL, (err) => {
            if (err) {
                return reject(err);
            }
        });
        con.close();
    }
}