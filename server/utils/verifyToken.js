const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = token => {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  return decoded;
};
