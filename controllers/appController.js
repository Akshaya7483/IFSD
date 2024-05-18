const user=require('../models/userModel')
const db = require('../models/appModel');

module.exports = {
    create_tb: (req, res) => {
        let appname = req.params.appname;
        let userId = req.session.userId;
        db.create_tb(appname,userId),(err)=>{0
            if(err){
                    console.error(err) ;
            }
            if(appname=="diary"){
                res.render('diary',{userId})
            }
            else if(appname="todo")
            {
                res.render('todo',{userId})
            }
        }
    },
    diary_entry:(req,res)=>{
        let userId = req.params.userId;
        let date_diary=req.params.date;
        let title_diary=req.params.title;
        let data_diary=req.params.data;
        db.diary_data(userId, date_diary, title_diary, data_diary)
    }
}