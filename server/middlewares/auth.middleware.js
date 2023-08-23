const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).send({ message: 'Unauthorizedddddd' })
  }
  
  try {
    
    console.log('1 token: ' + token)
    console.log('1 decoded: ' + jwt.verify(token, process.env.SECRET_KEY))
    console.log('1 secret: ' + process.env.SECRET_KEY)

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    console.log('token: ' + token)
    console.log('decoded: ' + decoded)
    console.log('secret: ' + process.env.SECRET_KEY)
    req.user = decoded;
    next()
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.status(401).send({ message: process.env.SECRET_KEY })
  }
}

module.exports = authMiddleware