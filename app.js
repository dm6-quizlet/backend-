require('dotenv').config()
const express = require('express')
,	path = require('path')
, session = require('express-session')
,	bodyParser = require('body-parser')
,	cors = require('cors')
,	passport = require('passport')
,	mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});
mongoose.Promise = require('bluebird');

mongoose.connection.on('connected', () => {
	console.log('Connected to database '+ process.env.DATABASE_URL)
});

mongoose.connection.on('error', (err) => {
	console.log('Database error: '+err)
});

const app = express();

const quizletUsers = require('./routes/users');
const studySets = require('./routes/study-sets');
const folders = require('./routes/folders')
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, '/build')))

//body parser middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', quizletUsers);
app.use('/api/studysets', studySets);
app.use('/api/folders', folders);

app.get('/', (req, res) => {
	res.send('invalid endpoint')
});

// Send every un-defined route to index.html
app.get('*', (req) => {
	res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.listen(process.env.PORT, () => {
	console.log('Server started on port '+ process.env.PORT)
});
