const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

//create express app
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

//configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


//Connecting the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the databse. Exiting now ...', err);
    process.exit();
});


//routes will go here
app.get('/', (req, res) => {
    res.json({'message': 'Welcome to easy application. '});
});

// app.get('/',function(req,res){
//     res.sendFile(__dirname + '/index.html');
//
// });


// require roduct routes
require('./app/routes/product.routes.js')(app);

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});