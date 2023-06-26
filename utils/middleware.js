const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const validateLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const authToken = authHeader.split(" ")[1];
    jwt.verify(authToken, secrets.jwtSecret, (err, token) => {
      if (err) {
        return res.status(403).send();
      }
      req.token = token;
      next();
    });
  } else {
    res.status(401).send();
  }
};

const denyEscalation = (req, res, next) => {
  if (!(req.token.admin && (req.body.admin || req.body.moderator)))  {
    
  } 
}

module.exports = {
  validateLoggedIn,
  
};
