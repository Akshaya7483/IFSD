const sqlite3 = require('sqlite3').verbose();
module.exports = {
    create_tb:(appname,userId)=>{
        const con= new sqlite3.Database(`./storage/${userId}.sqlite`)
        const createTableSQL = `CREATE TABLE  IF NOT EXISTS ${appname} (id INTEGER PRIMARY KEY AUTOINCREMENT,Date text,Title text,Entry TEXT)`;
        con.run(createTableSQL, (err) => {
            if (err) {
                return err;
            }
        });
        con.close();
    },
    diary_data: (userId, date_diary, title_diary, data_diary) => {
        const con = new sqlite3.Database(`./storage/${userId}.sqlite`);
        const insertEntrySQL = `INSERT INTO diary (Date, Title, Entry) VALUES (?, ?, ?)`;

        con.run(insertEntrySQL, [date_diary, title_diary, data_diary], (err) => {
            if (err) {
                console.error(err.message);
            }
            con.close(); 
        });
    }
}
