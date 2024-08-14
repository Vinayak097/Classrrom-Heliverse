import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
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
  

    if (!roles.length) {
      return next(); // 
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next(); 
  };
};
