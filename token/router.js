const express = require("express");
const db = require("../user/db");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");


//used to hash password in seeds
// router.post("/password", (req, res) => {
//   const user = req.body;
//   const hash = bcrypt.hashSync(user.password, 14);
//   res.status(200).json({ hash });
// });

//login - create token
router.post("/", (req, res) => {
  const credentials = req.body;
  db.getByEmail(credentials.email)
    .then((user) => {
      if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
        return res.status(401).json({ error: "Incorrect credentials" });
      } else {
        const token = generateToken(user);
        res.status(200).json({ token });
      }
    })
    .catch((err) => res.status(500).json({ error: "error logging in" }));
});

function generateToken(user) {
  const payload = {
    id: user.id, // sub in payload is what the token is about
    email: user.email,
    admin: user.admin,
    moderator: user.moderator
  };

  const options = {
    expiresIn: "1d", // show other available options in the library's documentation
  };

  // extract the secret away so it can be required and used where needed
  return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
}

module.exports = router;
