const db = require('../models/storageModel');
// const bcrypt = require('bcryptjs');

module.exports = {
    create_tb: async (req, res) => {
        const appname = req.params.appname;
        const userId = req.session.userId;
        if (!userId) {
            return res.status(401).send("Unauthorized");
        }
        try {
            await db.create_tb(userId, appname);
            res.redirect('/dashboard');
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    createdatabase:(req,res)=>{
        Id=req.params.userId
        db.createdatabase(Id)
        res.redirect('/login')
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