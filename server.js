const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/testdb').
then(() => {
	console.log("Connected to Database");
}).catch(err => {
	console.log("Error in connection with database ", err);
	process.exit();
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.json({"message":"Welcome to EasyNotes Application"});
});

require('./app/routes/note.routes.js')(app);

app.listen(3000, () =>{
	console.log("Server listening to port 3000");
});
