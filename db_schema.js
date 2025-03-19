const mongoose = require("mongoose");

const note = mongoose.Schema({
    id: {
        type: String,
        
        require: true
    },

    userId: {
        type: String,
        require: true
    },

    title: {
        type: String,
    },

    content: {
        type: String,
    },

    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Notessdd", note);


