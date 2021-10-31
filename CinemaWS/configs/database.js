const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/usersCinemaDB',{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });