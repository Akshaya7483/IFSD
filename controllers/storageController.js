const db = require('../models/storageModel');
const db2=require('../models/appModel')
const user=require('../models/userModel')
const AM=require('../models/appModel')

// const bcrypt = require('bcryptjs');

module.exports = {
    createdatabase:(req,res)=>{
        Id=req.params.userId
        db.createdatabase(Id)
        AM.create_diary(Id);
        AM.create_todo(Id)
        res.redirect('/login')
    },
 
    create: (req, res) => {
        let userI=req.params.userI;
        let username = req.params.username;
        console.log(userI,username)
        
        user.getUserByUsername(username,(err, user) => {
            if (err) {
                console.error("Error retrieving user by username:", err);
                res.status(500).send("An error occurred while retrieving user information");
                return;
            }
        if(!user)
        {
            console.error("user not found")
            res.status(500).send("No such username found please check the spelling");
            return;
        }
        console.log(user.id)
        db.create_usertable(userI,user.id);
        res.redirect(`/chatroom/${userI}`)
        });
    },
    chatroom: (req, res) => {
      
        const chatters = [];

        const userId = req.params.userI;
        db.chat(userId, (err, rows) => {
            if (err) {
                return res.status(500).send('Error fetching chatrooms');
            }
        
            const chatroomIds = rows.map(row => parseInt(row.name.replace('chat', '')));
            if(!chatroomIds.length)
            {   
                let giver="";
                let identifier="empty";
                res.render(`chatroom`,{userId,giver,identifier})
                return;
            }
            let completedRequests = 0;
            for (let i = 0; i < chatroomIds.length; i++) {
                user.getUserById(chatroomIds[i], (err, row) => {
                    if (err) {
                        console.error("Error while fetching usernames of userid:", err);
                        return res.status(500).send('Error fetching chatroomId');
                    }
                    if (!row) {
                        console.error("No users connected");
                        return res.status(500).send('Error fetching username');
                    }
                    chatters[i] = row.username;
                    completedRequests++;
                    if (completedRequests === chatroomIds.length) {
                        console.log(chatters);
                        let giver=chatters;
                        let identifier="chatters";
                        res.render(`chatroom`,{userId,giver,identifier})
                        return;
                    }
                });
            }
        });
    },
    chatview:(req,res)=>{
        let username = req.params.username;
        let userId=req.params.userId;
        user.getUserByUsername(username,(err, user) => {
            if (err) {
                console.error("Error retrieving user by username:", err);
                res.status(500).send("An error occurred while retrieving user information");
                return;
                }
            db.getchat(userId,user.id,(err,rows)=>{
                if(err){
                    console.error("there is an error while getting chat data")
                    res.status(500).send("error")
                    return;
                        }
                let row=JSON.stringify(rows)
                let giver=row;
                let identifier="chatview"
                res.render(`chatroom`,{userId,giver,identifier})
                            })
                        })

        },
    insert:(req,res)=>{
        
        let username = req.params.username;
        let userId=req.params.userId;
        let content=req.params.content;
        
        user.getUserByUsername(username,(err, user) => {
            if (err) {
                console.error("Error retrieving user by username:", err);
                res.status(500).send("An error occurred while retrieving user information");
                return;
            }
            db.insert(userId,user.id,content,(err)=>{
                db.getchat(userId,user.id,(err,rows)=>{
                    if(err){
                        console.error("there is an error while getting chat data")
                        res.status(500).send("error")
                        return;
                    }
                    let row=JSON.stringify(rows)
                    let giver=row;
                    let identifier="chatview"
                    res.render(`chatroom`,{userId,giver,identifier})
                })
            });
           
        })
       
    },
    reload:(req,res)=>{
        let username = req.params.username;
        let userId=req.params.userId;  
        if(username=="null") 
        {
            res.redirect(`/chatroom/${userId}`)
            return;
        }
          
        user.getUserByUsername(username,(err, user) => {
            if (err) {
                console.error("Error retrieving user by username:", err);
                res.status(500).send("An error occurred while retrieving user information");
                return;
            }
            db.getchat(userId,user.id,(err,rows)=>{
                if(err){
                    console.error("there is an error while getting chat data")
                    res.status(500).send("error")
                    return;
                    }
                    let row=JSON.stringify(rows)
                    res.render(`chatview`,{row,userId,username})
                });
           
        })
    },
    todo:(req,res)=>
    {
        userId=req.params.userId;
        res.render(`todo`)
    },
    diary:(req,res)=>{
        userId=req.params.userId;
        let giver=""
        let identifier="diary"
        res.render(`chatroom`,{userId,giver,identifier})
    },
    adddiary:(req,res)=>{
        userId=req.params.userId;
        date=req.params.date;
        title=req.params.title;
        entry=req.params.entry;
        db2.diary_data(userId,date,title,entry)
    }
};