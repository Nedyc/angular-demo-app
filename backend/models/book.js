const mongoose = require('mongoose');
const Author = require('./author');

var Book = mongoose.model('Book', {
    author: { type : Author },
    title: { type: String }
});

module.exports = { Book };