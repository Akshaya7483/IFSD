const db = require('../models/storageModel');
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
    create:(req,res)=>{
        userId=req.params.userId
        res.render('chatroom',{userId})
    }

};