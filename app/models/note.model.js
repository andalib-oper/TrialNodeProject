const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    text: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);