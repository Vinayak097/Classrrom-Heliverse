import express from 'express';
import { createClassroom, assignTeacher, getClassrooms, assignStudentToClassroom } from '../controllers/classroomController.js';
import { authenticateToken, authorizeRoles } from '../middleware/authMiddleware.js';



const router = express.Router();

router.post('/', createClassroom);
router.put('/:id/assign-teacher',[authenticateToken, authorizeRoles(['Principal'])], assignTeacher);
router.get('/', getClassrooms);
router.post('/', [authenticateToken, authorizeRoles(['principal'])], createClassroom);
router.put('/assignTeacher/:id', [authenticateToken, authorizeRoles(['Principal'])], assignTeacher);
router.put('/assignStudent/:classroomId', [authenticateToken, authorizeRoles(['Principal'])], assignStudentToClassroom);
//router.get('/:id', [authenticateToken, authorizeRoles(['Principal', 'Teacher'])], getClassroomDetails);

export default router;
