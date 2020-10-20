const Lists = require('../models/lists.model.js');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

exports.list = (req, res) => {
    // finds data associated with username. if data is available, it is sent
    // if data does not exist, a new document for the user is created
    Lists.find({ username: `${req.body.username}` }, (err, docs) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while retrieving to-do list. Sorry :|" });
        }
        else if (docs.length !== 0) {
            
            Lists.findOneAndUpdate({ username: `${req.body.username}` }, { items: req.body.items}, { new: true }, (err, data) => {
                if (err) {
                    console.log(err);
                    res.send({ 'error': err })
                } else {
                    res.send({'update': data})
                }
            })
        } else {
            let listNew = new Lists({
                username: req.body.username,
                items: req.body.items
            });

            listNew.save(function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ message: "Error occured while adding to-do item to database: item not added!!!" })
                } else {
                    res.send({ 'data': data });
                }
            })
        }
    })

}


// finds user's to-do list as soon as they login
exports.getUserList = function (req, res) {
    Lists.find({ username: `${req.params.user}` }, (err, docs) => {
        if (err) {
            console.log(err)
        } else {
            if (docs.length === 0) {
                res.send({ 'list': [] })
            } else {
                res.send({ 'list': docs[0].items })
            }

        }
    })
}