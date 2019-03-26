const express = require('express');
const router = express.Router();

const Note = require('../models/notes');

router.put('/', (req, res) => {

  const note = Note({
    userId: req.body.userId,
    content: req.body.content,
  });

  note.save((result) => {
    res.send(result);
  });
});


router.get('/', (req, res) => {
  Note.find((err, notes) => {
    res.send(notes)
  });
});




module.exports = router;
