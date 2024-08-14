import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { deleteUser, updateUser } from '../controllers/userController.js';

// get all teacheres
router.get('/',authenticateToken,authorizeRoles(['Principal',]), async (req, res) => {
  
  try {
    const teachers = await User.find({ role: 'Teacher' })
      .populate({
        path: 'classroom',
        select: 'name' 
      })
      .select('-password');

    res.status(200).json(teachers); 
  } catch (error) {
    console.error('Error fetching teachers:', error); 
    res.status(500).json({ message: 'Internal Server Error' }); 
  }
});

//delete students
router.delete('/:id',authenticateToken,authorizeRoles(['Principal','Teacher']), deleteUser)

//update students 
router.put('/:id',authenticateToken,authorizeRoles(['Principal','Teacher']),updateUser)


export default router;
