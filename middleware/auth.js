const jwt = require("jsonwebtoken");
const JWT_USER_PASS = "user123";

async function auth(req, res, next) {
  const { token } = req.cookies;
  const decodedToken =  jwt.verify(token, JWT_USER_PASS);
  if (decodedToken) {
    req.userID = decodedToken.id; // becoz we need to pass userId further to routes after auth done
    console.log(decodedToken.id);
    next();
  } else {
    res.status(403).json({
      message: "user not signed in",
    });
  }
}

module.exports = {
  auth: auth,
}; 
