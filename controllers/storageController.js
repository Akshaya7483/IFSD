const db = require('../models/storageModel');
const user=require('../models/userModel')
// const bcrypt = require('bcryptjs');

module.exports = {
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
        res.redirect('/chatroom')
        });
    },
    chatroom: (req, res) => {
        const userId = req.session.userId;
        db.chat(userId, (err, rows) => {
            if (err) {
                return res.status(500).send('Error fetching chatrooms');
            }
            const chatroomIds = rows.map(row => parseInt(row.name.replace('chat', '')));
            res.json(chatroomIds);
        });
    }
    

};






