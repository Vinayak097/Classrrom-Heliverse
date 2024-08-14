import express from 'express';
import { createClassroom, assignTeacher, getClassrooms, assignStudentToClassroom } from '../controllers/classroomController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';
import { classroomdetail } from '../controllers/classroomController.js';


const router = express.Router();

router.post('/', createClassroom);
router.put('/:id/assign-teacher', assignTeacher);
router.get('/', getClassrooms);

router.put('/assignStudent/:classroomId', assignStudentToClassroom);
//router.get('/:id', [authenticateToken, authorizeRoles(['Principal', 'Teacher'])], getClassroomDetails);

export default router;
