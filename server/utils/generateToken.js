const JWT = require("jsonwebtoken");

exports.generateToken = (id) => {
  return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
