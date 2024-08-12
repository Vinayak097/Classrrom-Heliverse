import Classroom from '../models/Classroom.js';
import User from '../models/user.js';

export const createClassroom = async (req, res) => {
  try {
    const { name, schedule } = req.body;
    console.log("entered in createclassroom")
    // Validate the schedule and other inputs here if needed

    const newClassroom = new Classroom({ name, schedule });
    await newClassroom.save();
    
    return res.status(201).json({ msg: 'Classroom created successfully', classroom: newClassroom });
  } catch (error) {
    console.log("error inr createclassroom conrotller ",error.message);
    return res.status(400).json({ error: error.message });
  }
};

export async function assignTeacher(req, res) {
  const { id } = req.params;
  console.log('enter ainsteacher')
  const { teacherId } = req.body;
  const classroom = await Classroom.findById(id);
  classroom.teacher = teacherId;
  await classroom.save();
  return res.status(200).json(classroom);
}

export async function getClassrooms(req, res) {
  const classrooms = await Classroom.find().populate('teacher');
  res.status(200).json(classrooms);
}


export async function assignStudentToClassroom(req, res) {
  try {
    const { classroomId, studentId } = req.body;

    // Find the classroom and add the student
    const classroom = await findById(classroomId);
    if (!classroom) return res.status(404).json({ msg: 'Classroom not found' });

    if (!classroom.students.includes(studentId)) {
      classroom.students.push(studentId);
      await classroom.save();
      res.status(200).json({ msg: 'Student assigned to classroom successfully' });
    } else {
      res.status(400).json({ msg: 'Student is already assigned to this classroom' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Remove a student from a classroom
export async function removeStudentFromClassroom(req, res) {
  try {
    const { classroomId, studentId } = req.body;

    // Find the classroom and remove the student
    const classroom = await findById(classroomId);
    if (!classroom) return res.status(404).json({ msg: 'Classroom not found' });

    classroom.students = classroom.students.filter(id => id.toString() !== studentId);
    await classroom.save();
    res.status(200).json({ msg: 'Student removed from classroom successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
