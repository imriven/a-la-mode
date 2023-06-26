const router = require("express").Router();
const db = require("./db");
const bcrypt = require("bcryptjs");
const { validateLoggedIn } = require("../utils/middleware");

router.get("/:id/wine", (req, res) => {
  db.getWineByUserId(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "No wines exist" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) =>
      res.status(500).json({ error: `Error connecting to database, ${err}` })
    );
});

router.get("/following", validateLoggedIn, (req, res) => {
  db.getFollowersByUserId(req.token.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "No followers exist" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) =>
      res.status(500).json({ error: `Error connecting to database, ${err}` })
    );
});

//we recoded the one from above so we get the ID from the token instead
// router.get(
//   "/:id/following",
//   validateLoggedIn,
//   validateUserEditSelf,
//   (req, res) => {
//     db.getFollowersByUserId(req.params.id)
//       .then((result) => {
//         if (!result) {
//           res.status(404).json({ error: "No followers exist" });
//         } else {
//           res.status(200).json(result);
//         }
//       })
//       .catch((err) =>
//         res.status(500).json({ error: `Error connecting to database, ${err}` })
//       );
//   }
// );

router.post("/connection/:id", validateLoggedIn, (req, res) => {
  db.insertFollow(req.token.id, req.params.id)
    .then(() => res.status(201).send())
    .catch((err) =>
      res.status(500).json({ error: `error registering user, ${err}` })
    );
});

router.put("/", validateLoggedIn, (req, res) => {
  db.updateUserProfile(Number(req.token.id), req.body)
    .then((result) => {
      if (result === 1) {
        res.status(202).send();
      } else {
        res.status(500).json({ error: "Error Updating Profile" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.delete("/", validateLoggedIn, (req, res) => {
  db.removeUser(Number(req.token.id))
    .then((result) => {
      if (result === 1) {
        res.status(202).send();
      } else {
        res.status(500).json({ error: "error deleting profile" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.delete("/connection/:id", validateLoggedIn, (req, res) => {
  db.removeFollow(Number(req.token.id), Number(req.params.id))
    .then((result) => {
      if (result === 1) {
        res.status(202).send();
      } else {
        res.status(500).json({ error: "error deleting profile" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "error connecting to database" });
    });
});

router.post("/", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;
  db.insertUser(user)
    .then((id) => res.status(201).send())
    .catch((err) =>
      res.status(500).json({ error: `error registering user, ${err}` })
    );
});

router.get("/:id", (req, res) => {
  db.getById(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "This user doesn't exist" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) =>
      res.status(500).json({ error: `Error connecting to database, ${err}` })
    );
});

router.get("/", (req, res) => {
  db.getAll()
    .then((result) => {
      if (!result) {
        res.status(404).json({ error: "No users exist" });
      } else {
        res.status(200).json(result);
      }
    })
    .catch((err) =>
      res.status(500).json({ error: `Error connecting to database, ${err}` })
    );
});

module.exports = router;
