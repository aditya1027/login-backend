require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://adi11:Aditya@1999@devconnector.cbfy0.mongodb.net/DevConnector?retryWrites=true&w=majority';
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected');
});
mongoose.connection.on('error', (err) => {
console.error('Error connecting');
})

app.get('/' ,requireAuth, (req,res) => {
    res.send(`email : ${req.user.email}`);
});

app.listen(3000,() => {
    console.log('Listening on 3000');
});