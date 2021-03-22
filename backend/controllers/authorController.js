const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Author } = require('../models/author');

router.get('/list', (req, res) => {
    let orderedBy = JSON.parse(req.query.orderedBy);
    let whereField = "";
    let whereValue = "";
    if(req.query.searchBy != "undefined"){
        searchBy = JSON.parse(req.query.searchBy);
        whereField = searchBy.searchType;
        whereValue = searchBy.searchParameter;
    }
    
    Author
        .find(whereField != "" ? {[whereField]: { $regex: '.*' + whereValue + '.*', "$options": "i" }}: {})
        .sort([[orderedBy.value, orderedBy.direction]])
        .exec((err, docs) => {
            if(!err){ res.send(docs); }
            else { console.log('Error retrieving authors: ' + JSON.stringify(err, undefined, 2))}
        });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No author with given id:'+ req.params.id);

    Author.findById(req.params.id, (err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error retrieving author: ' + JSON.stringify(err, undefined, 2))}
    });
});

router.post('/', (req, res) => {
    var author = new Author({
        name: req.body.name,
        surname: req.body.surname
    });

    author.save((err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error saving authors: ' + JSON.stringify(err, undefined, 2))}
    });
});

router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('No author with given id:'+ req.params.id);

    var author = new Author({
        _id: req.body._id,
        name: req.body.name,
        surname: req.body.surname
    });

    Author.findByIdAndUpdate(req.params.id, { $set: author }, { new: true}, (err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error updating author: ' + JSON.stringify(err, undefined, 2))}
    });
});

router.delete('/', (req, res) => {
    let ids = JSON.parse(req.query.ids);
    Author.deleteMany({ _id : { $in: ids}}, (err, doc) => {
        if(!err){ res.send(doc); }
        else { console.log('Error deleting author: ' + JSON.stringify(err, undefined, 2))}
    });
});

module.exports = router;