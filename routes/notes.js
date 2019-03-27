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

router.patch('/:id', function(req, res, next) {
    
  if (!req.body.note || !req.param.id) {
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
          "text": "Requête NON  valide"
      })
  } else {
      (async function (resolve, reject) {
          await Note.update({ userID: req.param.id }, { content: req.body.note,lastUpdateAt: new Date() }, options, callback)

      }).then(function (error) {
          switch (error) {
              case 500:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
                  break;
              case 204:
                  res.status(204).json({
                      "text": "L'adresse email existe déjà"
                  })
                  break;
              default:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
          }
      })

  }

});

router.delete('/:id', function(req, res, next) {
  if (!req.param.id) {
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
          "text": "Requête NON  valide"
      })
  } else {
      (async function (resolve, reject) {
          await Note.deleteOne( { _id : ObjectId(req.param.id) } );

      }).then(function (error) {
          switch (error) {
              case 500:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
                  break;
              case 204:
                  res.status(204).json({
                      "text": "L'adresse email existe déjà"
                  })
                  break;
              default:
                  res.status(500).json({
                      "text": "Erreur interne"
                  })
          }
      })

  }

});




module.exports = router;
