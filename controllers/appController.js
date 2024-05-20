const user=require('../models/userModel')
const db = require('../models/appModel');

module.exports = {
    create_tb: (req, res) => {
        let appname = req.params.appname;
        let userId = req.session.userId;
            if(appname=="diary"){
                db.create_tb(appname,userId),(err)=>{
                    if(err){
                            console.error(err) ;
                    }
                res.render('diary',{userId})
            }}
            else if(appname="todo")
            {
                db.create_tb(appname,userId),(err)=>{
                    if(err){
                            console.error(err) ;
                    }
                res.render('todo',{userId})
            }
        }},
    diary_entry:(req,res)=>{
        let userId = req.params.userId;
        let date_diary=req.params.date;
        let title_diary=req.params.title;
        let data_diary=req.params.data;
        db.diary_data(userId, date_diary, title_diary, data_diary)
    }
}