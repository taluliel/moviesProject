const express = require('express');
const subscriptionsRouter = require('./routers/subscriptionsRouter');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended : false}));

require('./configs/database');

app.use('/api/subscriptions', subscriptionsRouter);

app.listen(5000);