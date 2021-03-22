const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Book } = require('../models/book');

router.get('/list', (req, res) => {
    let orderedBy = JSON.parse(req.query.orderedBy);
    let whereField = "";
    let whereValue = "";
    if(req.query.searchBy != "undefined"){
        searchBy = JSON.parse(req.query.searchBy);
        whereField = searchBy.searchType;
        whereValue = searchBy.searchParameter;
    }
    
    Book
        .find(whereField != "" ? {[whereField]: { $regex: '.*' + whereValue + '.*', "$options": "i" }}: {})
        .sort([[orderedBy.value, orderedBy.direction]])
        .exec((err, docs) => {
            if(!err){ res.send(docs); }
            else { console.log('Error retrieving books: ' + JSON.stringify(err, undefined, 2))}
        });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No book with given id:'+ req.params.id);

        Book.findById(req.params.id, (err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error retrieving book: ' + JSON.stringify(err, undefined, 2))}
    });
});

router.post('/', (req, res) => {
    var book = new Book({
        author: req.body.author,
        title: req.body.title
    });

    book.save((err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error saving book: ' + JSON.stringify(err, undefined, 2))}
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No book with given id:'+ req.params.id);

    var book = new Book({
        _id: req.body._id,
        author: req.body.author,
        title: req.body.title
    });

    Book.findByIdAndUpdate(req.params.id, { $set: book }, { new: true}, (err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error updating book: ' + JSON.stringify(err, undefined, 2))}
    });
});

router.delete('/', (req, res) => {
    let ids = JSON.parse(req.query.ids);
    Book.deleteMany({ _id : { $in: ids}}, (err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error deleting book: ' + JSON.stringify(err, undefined, 2))}
    });
});

module.exports = router;