const mongoose = require('mongoose');

let MovieSchema = new mongoose.Schema({
    Name : String,
    Genres : [String],
    Image : String,
    Premiered : String
})


module.exports = mongoose.model('movies',MovieSchema);
