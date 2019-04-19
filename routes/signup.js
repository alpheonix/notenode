const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../model/user");
const passwordHash = require("password-hash");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("inscription");
});

/* POST users listing. */
router.post("/", (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      error: "Le champ utilisateur ou password est vide",
      token: undifined
    });
  }

  const hasLowerCase = str => /\b([a-z]+)\b/.test(str);

  if (!hasLowerCase(req.body.username)) {
    res.status(400).json({
      error:
        "Votre identifiant ne doit contenir que des lettres minuscules non accentuées",
      token: undifined
    });
  }

  if (req.body.username.length < 2 || req.body.username.length > 20) {
    res.status(400).json({
      error: "Votre identifiant doit contenir entre 2 et 20 caractères",
      token: undifined
    });
  }

  const user = {
    username: req.body.username,
    password: passwordHash.generate(req.body.password)
  };

  // On vérifie que l'utilisateur n'existe pas dans la base de données

  const findUser = new Promise((resolve, reject) => {
    User.findOne(
      {
        username: user.username
      },
      (err, result) => {
        if (err) {
          reject(500);
        }
        if (result) {
          reject(204);
        } else {
          resolve(true);
        }
      }
    );
  });

  findUser.then(
    () => {
      const newUser = new User(user);
      newUser.save((err, user) => {
        if (err) {
          res.status(500).send("Erreur interne");
        }
        jwt.sign(
          { userID: user._id },
          config.secret,
          { expiresIn: "20min" },
          (err, token) => {
            res.status(200).json({
              error: null,
              token: token
            });
          }
        );
      });
    },
    error => {
      switch (error) {
        case 500:
          res.status(500).send("Erreur interne");
          break;
        case 204:
          res.status(400).json({
            error: "Cet identifiant est déjà associé à un compte",
            token: undifined
          });
          break;
        default:
          res.status(500).send("Erreur interne");
      }
    }
  );
});

module.exports = router;
