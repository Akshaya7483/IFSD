const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

module.exports = {
    createdatabase:(id)=>{
        const db=new sqlite3.Database(`./storage/${id}.sqlite`)
    },
    create_usertable:(id1,id2)=>{
        const con= new sqlite3.Database(`./storage/${id1}.sqlite`)
        const create4userI = `CREATE TABLE chat${id2} (id INTEGER PRIMARY KEY AUTOINCREMENT,SentBy,data TEXT)`;
        con.run(create4userI, (err) => {
            if (err) {
                return err;
            }
        });
        const con2= new sqlite3.Database(`./storage/${id2}.sqlite`)
        const create4username = `CREATE TABLE chat${id1} (id INTEGER PRIMARY KEY AUTOINCREMENT,SentBy,data TEXT)`;
        con2.run(create4username, (err) => {
            if (err) {
                return err;
            }
        });
        con.close();
        con2.close();
    },
    chat: (userId, callback) => {
        const con = new sqlite3.Database(`./storage/${userId}.sqlite`);
        const ṣql = `SELECT name FROM sqlite_master WHERE type="table" AND name LIKE 'chat%'`;
        con.all(ṣql, [], (err, rows) => {
            if (err) {
                console.error(err);
                callback(err, null); // Pass error to the callback
                return;
            }
            callback(null, rows); // Pass rows to the callback
        });
    
        con.close();
    },
    getchat:(userId,chatid,callback)=>{
        const con = new sqlite3.Database(`./storage/${userId}.sqlite`);
        const sql=`SELECT * FROM chat${chatid}`
        con.all(sql,[],(err,rows)=>{
            if(err){
                console.error(err)
                callback(err,null)
                return;
            }
            callback(null,rows)
        })
    },
    insert:(userI,userID,data)=>{
        const con = new sqlite3.Database(`./storage/${userI}.sqlite`);
        const sql=`insert into chat${userID} (SentBy,data) values(?,?)`;
        con.run(sql,[1,data],(err)=>{
            if(err){
                console.error(err.message)
            }
        })
        const con2 = new sqlite3.Database(`./storage/${userID}.sqlite`);
        const sql2=`insert into chat${userI} (SentBy,data) values(?,?)`;
        con.run(sql2,[0,data],(err)=>{
            if(err){
                console.error(err.message)
            }
        })
        con.close()
        con2.close()
    }
    
}