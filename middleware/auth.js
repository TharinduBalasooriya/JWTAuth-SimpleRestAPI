const jwt = require("jsonwebtoken");

let verifyToken = function(req,res,next){

    let token = req.headers["token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, 'key', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });

};

module.exports = verifyToken