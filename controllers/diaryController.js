const user=require('../models/userModel')
const db = require('../models/diaryModel');

module.exports = {
    create_tb: (req, res) => {
        const appname = req.params.appname;
        const userId = req.session.userId;
        db.create_tb(appname,userId);
    }
}