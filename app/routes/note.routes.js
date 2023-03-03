module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');
    const auth = require("../controllers/auth.controller.js");
    const verifyToken = require('../middleware/authJWT.js');
    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes',notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Retrieve a single Note with note title
    app.get('/note/:title', notes.title);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}