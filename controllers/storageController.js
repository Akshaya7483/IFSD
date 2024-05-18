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
        if(!user)
        {
            console.error("user not found")
            res.status(500).send("No such username found please check the spelling");
            return;
        }
        db.create_usertable(userI,user.id);
        res.redirect(`/chatroom/${userI}`)
        });
    },
    chatroom: (req, res) => {
        const chatters = [];
        let completedRequests = 0;
        const userId = req.params.userI;
        db.chat(userId, (err, rows) => {
            if (err) {
                return res.status(500).send('Error fetching chatrooms');
            }
            const chatroomIds = rows.map(row => parseInt(row.name.replace('chat', '')));
      
    
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
                        let row="";
                        let username="";
                        let msg="";
                        res.render(`chatroom`,{chatters,userId,row,username,msg})
                    }
                });
            }
        });
    },
    chatview:(req,res)=>{
        const chatters = [];
        let completedRequests = 0;
        let username = req.params.username;
        let userId=req.params.userId;
        
        db.chat(userId, (err, rows) => {
            if (err) {
                return res.status(500).send('Error fetching chatrooms');
            }
            const chatroomIds = rows.map(row => parseInt(row.name.replace('chat', '')));
      
    
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
                                let msg=""
                                res.render(`chatroom`,{chatters,userId,row,username,msg})
                            })
                        })

                    }
                });
            }
        });    
    },
    insert:(req,res)=>{
        const chatters = [];
        let completedRequests = 0;
        const userId = req.params.userId;
        let username = req.params.username;
        let content=req.params.content;
        db.chat(userId, (err, rows) => {
            if (err) {
                return res.status(500).send('Error fetching chatrooms');
            }
            const chatroomIds = rows.map(row => parseInt(row.name.replace('chat', '')));
      
    
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
                                    let msg=""
                                    res.render(`chatroom`,{row,userId,username,chatters,msg})
                                })
                            });
                           
                        })
                    }
                });
            }
        });
    },
    reload:(req,res)=>{
        const chatters = [];
        let completedRequests = 0;
        let userId=req.params.userId;  
        let username = req.params.username;
        let msg=req.params.msg
        if(msg=="null")
            {
                msg=""; 
           }
        if(username=="null")
            {
                username=""
            }
        db.chat(userId, (err, rows) => {
            if (err) {
                return res.status(500).send('Error fetching chatrooms');
            }
            const chatroomIds = rows.map(row => parseInt(row.name.replace('chat', '')));
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
                        user.getUserByUsername(username,(err, user) => {
                        if (err) {
                            console.error("Error retrieving user by username:", err);
                            res.status(500).send("An error occurred while retrieving user information");
                            return;
                        }
                    if(!user)
                    {
                        let row=""
                        res.render(`chatroom`,{chatters,row,userId,username,msg})
                        return;
                        }
                       db.getchat(userId,user.id,(err,rows)=>{
                        if(err){
                        console.error("there is an error while getting chat data")
                        res.status(500).send("error")
                        return;
                        }
                        let row=JSON.stringify(rows)
                        
                    res.render(`chatroom`,{chatters,row,userId,username,msg})
                })
           
        })
                    }
                });
            }
        });
 
    }
};