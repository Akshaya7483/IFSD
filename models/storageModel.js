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
    },
    create_usertable:(id1,id2)=>{
        const con= new sqlite3.Database(`./storage/${id1}.sqlite`)
        const create4userI = `CREATE TABLE chat${id2} (id INTEGER PRIMARY KEY AUTOINCREMENT,data TEXT)`;
        con.run(create4userI, (err) => {
            if (err) {
                return err;
            }
        });
        const con2= new sqlite3.Database(`./storage/${id2}.sqlite`)
        const create4username = `CREATE TABLE chat${id1} (id INTEGER PRIMARY KEY AUTOINCREMENT,data TEXT)`;
        con2.run(create4username, (err) => {
            if (err) {
                return err;
            }
        });
        con.close();
        con2.close();
    }
}