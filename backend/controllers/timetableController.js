

import Classroom from '../models/Classroom.js';
import Timetable from '../models/Timetable.js';
import User from '../models/User.js';

export const createTimetable = async (req, res) => {
  try {
    const { classroomId, subject, periods } = req.body;
    const userId = req.user.id; 
    const userRole = req.user.role; 
    console.log("detaitl ", userId,userRole)
    // Find the classroom
    const classroom = await Classroom.findById(classroomId);
    if (!classroom) return res.status(404).json({ message: 'Classroom not found' });

    // Find the user (either a teacher or principal)
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if the user is allowed to create or update the timetable
    if (userRole === 'Teacher') {
      // Check if the teacher is assigned to the classroom
      if (user.classroom.toString() !== classroomId) {
        return res.status(403).json({ message: 'Unauthorized to create timetable for this classroom' });
      }
    } else if (userRole !== 'Principal') {
      // If the user is neither a teacher assigned to the classroom nor a principal, deny access
      return res.status(403).json({ message: 'Unauthorized to create timetable for this classroom' });
    }

    // Create or update the timetable
    const newTimetable = new Timetable({
      classroom: classroomId,
      subject,
      periods
    });

    await newTimetable.save();
    res.status(201).json({ message: 'Timetable created successfully', timetable: newTimetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const teacherId = req.user.id; 
    console.log("teacherId ", teacherId,id);
    if(req.user.role==="Principal"){
      const timetable = await Timetable.findOne({ classroom: id });
      return timetable;
    }
    
    const teacher = await User.findById(teacherId);
    
    console.log(teacher)
    if (!teacher || teacher.classroom.toString() !== id) {
      return res.status(403).json({ message: 'Unauthorized to access timetable for this classroom' });
    }

    // Get the timetable
    const timetable = await Timetable.findOne({ classroom: id });
    if (!timetable) return res.status(404).json({ message: 'Timetable not found' });

    return res.status(200).json(timetable);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateTimetable = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const { subject, periods } = req.body;
    const teacherId = req.user.id; // Get the authenticated teacher's ID

    // Check if the teacher is assigned to the classroom
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.classroom.toString() !== classroomId) {
      return res.status(403).json({ message: 'Unauthorized to update timetable for this classroom' });
    }

    // Update the timetable
    const updatedTimetable = await Timetable.findOneAndUpdate(
      { classroom: classroomId },
      { subject, periods },
      { new: true }
    );

    if (!updatedTimetable) return res.status(404).json({ message: 'Timetable not found' });

    res.status(200).json({ message: 'Timetable updated successfully', timetable: updatedTimetable });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTimetable = async (req, res) => {
  try {
    const { classroomId } = req.params;
    const teacherId = req.user.id; // Get the authenticated teacher's ID

    // Check if the teacher is assigned to the classroom
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.classroom.toString() !== classroomId) {
      return res.status(403).json({ message: 'Unauthorized to delete timetable for this classroom' });
    }

    // Delete the timetable
    const deletedTimetable = await Timetable.findOneAndDelete({ classroom: classroomId });
    if (!deletedTimetable) return res.status(404).json({ message: 'Timetable not found' });

    res.status(200).json({ message: 'Timetable deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
