import express, { json } from 'express';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.js'
import classroomRoutes from './routes/classroom.js'
import cors from 'cors'
import { authenticateToken, authorizeRoles } from './middleware/authMiddleware.js';
import studentRoutes from './routes/student.js'
import timetableRoutes from './routes/timetableRoutes.js'
import teachersRoutes from './routes/teacher.js';
import { classroomdetail } from './controllers/classroomController.js';

const app = express();

dotenv.config();
app.use(json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allows cookies to be sent and received
}));
app.get('/test',authenticateToken, (req, res) => {
  res.cookie('testCookie', 'testValue', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'None',
  });
  res.send('Cookie is set');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', [authenticateToken, authorizeRoles(['Principal', 'Teacher'])], userRoutes);
app.use('/api/classrooms', [authenticateToken, authorizeRoles(['Principal', 'Teacher'])], classroomRoutes);
app.use('/api/students', authenticateToken, studentRoutes); // Add student routes
app.use('/api/timetables', [authenticateToken, authorizeRoles(['Teacher','Principal'])], timetableRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/classroom-detail/:id',authenticateToken,classroomdetail)





const PORT = process.env.PORT || 5000;
await connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)
);
