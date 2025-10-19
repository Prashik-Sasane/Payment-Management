// const jwt = require('jsonwebtoken');
// const { getUserById } = require('../models/userModel');

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; 

//   if (!token) {
//     return res.status(401).json({ error: 'Access token required' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ error: 'Invalid or expired token' });
//     }


//     getUserById(decoded.userId, (err, user) => {
//       if (err || !user) {
//         return res.status(403).json({ error: 'User not found' });
//       }
      
//       req.user = user;
//       next();
//     });
//   });
// };

// const generateToken = (userId) => {
//   return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
// };

// module.exports = {
//   authenticateToken,
//   generateToken
// };
