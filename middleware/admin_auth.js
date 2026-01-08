const jwt = require("jsonwebtoken")
const {JWT_ADMIN_SECRET}= require("../config")


function admin_auth(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_ADMIN_SECRET);
  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in!",
    });
  }
};

module.exports = {
admin_auth
}

//  i have changed user to admin n admin auth function whereas harkrat did not