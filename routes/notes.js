const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const router = express.Router();

const Note = require("../models/notes");

router.put("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({
        error: "Veuillez vous reconnecter"
      });
    }
    const note = Note({
      userId: authData.userId,
      content: req.body.content
    });
    note.save(result => {
      res.send(result);
    });
  });
});

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({
        error: "Veuillez vous reconnecter"
      });
    }

    Note.find({ userId: authData.userId }, (err, note) => {
      if (!note.length) {
        res.status(400).json({
          error: "Cet utilisateur n'a pas de notes"
        });
      } else {
        res.status(200).json({
          error: err,
          note: note
        });
      }
    });
  });
});

router.patch("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    if (err) {
      res.status(403).json({
        error: "Veuillez vous reconnecter"
      });
    }
    Note.update(
      { _id: req.params.id },
      { content: req.body.content, lastUpdateAt: new Date() },
      (err, note) => {
        if (err) {
          res.status(400).json({
            error: "Erreur lors de la mise à jour de votre note",
            note: note
          });
        } else {
          res.status(200).json({
            error: err,
            note: note
          });
        }
      }
    );
  });
});

router.delete("/:id", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_KEY, (err, authData) => {
    Note.deleteOne({ _id: req.params.id }, (err, note) => {
      if (err) {
        res.status(400).json({
          error: "Erreur lors de la suppression de votre note",
          note: note
        });
      } else {
        res.status(200).json({
          error: err,
          note: note
        });
      }
    });
  });
});

function verifyToken(req, res, next) {
  if (req.headers["x-access-token"]) {
    req.token = req.headers["x-access-token"];
    next();
  }
}

module.exports = router;
