const sqlite3 = require('sqlite3').verbose();
module.exports = {
    create_tb:(appname,userId)=>{
        const con= new sqlite3.Database(`./storage/${userId}.sqlite`)
        const createTableSQL = `CREATE TABLE ${appname} (id INTEGER PRIMARY KEY AUTOINCREMENT,data TEXT)`;
        con.run(createTableSQL, (err) => {
            if (err) {
                return err;
            }
        });
        con.close();
    }
}
