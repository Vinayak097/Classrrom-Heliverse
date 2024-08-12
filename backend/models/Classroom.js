import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schedule: [{
    day: { type: String, required: true }, // e.g., "Monday"
    startTime: { type: String, required: true }, // e.g., "12:00 PM"
    endTime: { type: String, required: true } // e.g., "06:00 PM"
  }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Classroom = mongoose.model('Classroom', classroomSchema);

export default Classroom;
