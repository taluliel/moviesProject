const express= require('express');
const usersRouter= require('./routers/usersRouter');
const moviesRouter= require('./routers/moviesRouter');
const memberRouter= require('./routers/membersRouter');
const dataRouter= require('./routers/dataRouter');
const subscriptionsRouter= require('./routers/subscriptionsRouter');
const cors = require('cors');

let app=express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
require('./configs/database');

app.use(cors());
app.use('/api/main', dataRouter);
app.use('/api/users', usersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/members', memberRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.listen(8000);