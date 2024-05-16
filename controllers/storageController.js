const db = require('../models/storageModel');
const user=require('../models/userModel')
// const bcrypt = require('bcryptjs');

module.exports = {
    createdatabase:(req,res)=>{
        Id=req.params.userId
        db.createdatabase(Id)
        res.redirect('/login')
    },
    create_tb: (req, res) => {
        const appname = req.params.appname;
        const userId = req.session.userId;
        db.create_tb(appname,userId)
    },
    dashboard:(req,res)=> {
        userId=req.session.userId
        res.redirect(`/dashboard/${userId}`)
    },
    sess:(req,res)=>{
        userId=req.params.userId
        res.render('dashboard',{userId})
    },
    create: (req, res) => {
        let userI=req.params.userI;
        let username = req.params.username;
        user.getUserByUsername(username,(err, user) => {
            if (err) {
                console.error("Error retrieving user by username:", err);
                res.status(500).send("An error occurred while retrieving user information");
                return;
            }
        // console.log(user.id)
        db.create_usertable(userI,user.id);
        });
    }  

};
