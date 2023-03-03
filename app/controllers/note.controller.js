const Note = require("../models/note.model.js");
const jwt = require("../middleware/authJWT");
// Create and Save a new Note
exports.create = (req, res) => {
  // Validate request
  if (req.headers.authorization) {
    if (!req.body.text) {
      return res.status(400).send({
        message: "Note Text can not be empty",
      });
    }

    // Create a Note
    const note = new Note({
      title: req.body.title || "Untitled Note",
      text: req.body.text,
    });

    // Save Note in the database
    note
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Note.",
        });
      });
  } else {
    res.status(500).send({
      message: "Please provide authorization to add notes",
    });
  }
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
  if (req.headers.authorization) {
    Note.find()
      .then((notes) => {
        res.send(notes);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving notes.",
        });
      });
  } else {
    res.status(500).send({
      message: "Please provide authorization to access all the notes",
    });
  }
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
  Note.findById(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      console.log("69")
      if (err.kind === "ObjectId") {
        console.log("71")
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.noteId,
      });
    });
};

// find a single note with a note title
exports.title = async (req, res)=>{
  try {
    const note = await (
      await Note.find({title: req.params.title})
    ).filter((note) => note.title===req.params.title);
    res.json(note)
  } catch (err) {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
  }
}

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.text) {
    return res.status(400).send({
      message: "Note Text can not be empty",
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(
    req.params.noteId,
    {
      title: req.body.title || "Untitled Note",
      text: req.body.text,
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send(note);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      res.send({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId,
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId,
      });
    });
};
