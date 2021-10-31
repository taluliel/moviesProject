const mongoose = require('mongoose');

let SubscriptionsSchema = new mongoose.Schema({
    MemberId : String,
    Movies : { movieId : String, date : String}
})

module.exports = mongoose.model('subscriptions',SubscriptionsSchema);