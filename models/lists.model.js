const mongoose = require('mongoose');


const ListSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    items: {
        type: Array
    }
});

module.exports = mongoose.model('Lists', ListSchema);