const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    text: String,
    year: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);