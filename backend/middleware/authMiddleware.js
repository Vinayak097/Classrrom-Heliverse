import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log("helo")
  console.log(token);
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  console.log("authentication ")
  jwt.verify(token, process.env.JWT_SECRET,async (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    const userd=await User.findOne({email:user.email})
    if(!userd){
      return res.status(401).json("user not found");  
    }
    req.user = userd;
    
    next();
  });
};

export const authorizeRoles = (roles = []) => {
  return (req, res, next) => {
    console.log('User Role:', req.user.role); // Debugging line
    console.log('Allowed Roles:', roles); // Debugging line

    if (!roles.length) {
      return next(); // If no roles are specified, continue to the next middleware
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next(); // User role is authorized, continue to the next middleware
  };
};
