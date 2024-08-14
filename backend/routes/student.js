import express from 'express';
import { getStudentClassroom, getStudentList, getTimetableByClassroom } from '../controllers/studentController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get list of students in a classroom (accessible to students in the classroom)
router.get('/classroom/:classroomId/students', authenticateToken, getStudentList);

// Get timetable for a classroom (accessible to students in the classroom)
router.get('/classroom/:classroomId/timetable', authenticateToken, getTimetableByClassroom);
router.get('/classroom', authenticateToken, getStudentClassroom);

//get all students in 
router.get('/',authenticateToken,authorizeRoles(['Principal']), async (req, res) => {
    try {
      const student = await User.find({ role: 'Student' }) 
        .populate({
          path: 'classroom',
          select: 'name' 
        })
        .select('-password'); // Exclude the password field
  
      res.status(200).json(student); // Send the list of teachers with classroom names
    } catch (error) {
      console.error('Error fetching teachers:', error); // Log the error
      res.status(500).json({ message: 'Internal Server Error' }); // Error response
    }
});



export default router;