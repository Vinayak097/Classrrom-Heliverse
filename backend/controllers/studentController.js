import Classroom  from '../models/Classroom.js';
import User from '../models/user.js';
import Timetable from '../models/Timetable.js';
 


export async function getStudentList(req, res) {
    try {
      const classroom = await Classroom.findById(req.params.classroomId).populate('students');
      if (!classroom) return res.status(404).json({ msg: 'Classroom not found' });
  
      // Check if the logged-in student is part of the classroom
      if (!classroom.students.includes(req.user._id)) {
        return res.status(403).json({ msg: 'Access denied' });
      }
      res.status(200).json(classroom.students);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  export async function getTimetableByClassroom(req, res) {
    try {
      const timetable = await Timetable.find({ classroom: req.params.classroomId });
      if (!timetable) return res.status(404).json({ msg: 'Timetable not found' });
  
      // Check if the logged-in student is part of the classroom
      if (timetable.every(item => item.classroom.toString() !== req.params.classroomId)) {
        return res.status(403).json({ msg: 'Access denied' });
      }
  
      res.status(200).json(timetable);
    } catch (error) {
        console.log("error in student routes | studentcontroller")
      res.status(400).json({ error: error.message });
    }
  }

  export const getStudentClassroom = async (req, res) => {
    try {
      const student = await User.findById(req.user.id).populate('classroom');
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.status(200).json(student.classroom);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
