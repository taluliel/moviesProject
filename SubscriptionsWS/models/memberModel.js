const mongoose = require('mongoose');

let MemberSchema = new mongoose.Schema({
    Name : String,
    Email : String,
    City : String
})

module.exports = mongoose.model('members',MemberSchema);
