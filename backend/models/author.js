const mongoose = require('mongoose');

var Author = mongoose.model('Author', {
    name: { type : String },
    surname: { type: String }
});

module.exports = { Author };