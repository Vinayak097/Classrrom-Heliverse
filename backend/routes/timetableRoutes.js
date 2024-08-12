import express from 'express';
import {
  createTimetable,
  getTimetable,
  updateTimetable,
  deleteTimetable
} from '../controllers/timetableController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();


router.post('/', authenticateToken, createTimetable);


router.get('/classroom/:classroomId', authenticateToken, getTimetable);


router.put('/classroom/:classroomId', authenticateToken, updateTimetable);


router.delete('/classroom/:classroomId', authenticateToken, deleteTimetable);

export default router;
