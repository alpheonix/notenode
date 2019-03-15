const express = require('express');
const router = express.Router();

const Note = require('../models/notes');

router.put('/', (req, res) => {

  const note = Note({
    title: req.body.title,
    content: req.body.content
  });

  note.save((err, res) => {
    if (err){
      res.send('Erreur')
    } else {
      console.log(note);
    }
  });
});




module.exports = router;
