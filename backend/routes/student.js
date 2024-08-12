import express from 'express';
import { getStudentClassroom, getStudentList, getTimetableByClassroom } from '../controllers/studentController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

// Get list of students in a classroom (accessible to students in the classroom)
router.get('/classroom/:classroomId/students', authenticateToken, getStudentList);

// Get timetable for a classroom (accessible to students in the classroom)
router.get('/classroom/:classroomId/timetable', authenticateToken, getTimetableByClassroom);
router.get('/classroom', authenticateToken, getStudentClassroom);

export default router;