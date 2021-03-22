const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var authorController = require('./controllers/authorController');
var bookController = require('./controllers/bookController');

var app = express();
app.use(bodyParse.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Server started at port: 3000'));

app.use('/authors', authorController);
app.use('/books', bookController);