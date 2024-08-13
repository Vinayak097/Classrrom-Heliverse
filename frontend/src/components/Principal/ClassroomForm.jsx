// src/components/Dashboard/CreateClassroomForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CreateClassroomForm = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);
  const [teacher,setTeacher]=useState();
  const [teacherId,setTeacherId]=useState("");
  const [classroomId,setClassroomId]=useState("");
  const [loading,setloading]=useState(false);

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/classrooms', {
        name,
        startTime,
        endTime,
        days,
      },
      {
      headers:{
        "authorization"      :localStorage.getItem('authToken')
      }}
    );
      // Handle success
      setloading(false)
      console.log("successfully created")
    } catch (error) {
      setloading(false)
      console.error('Error creating classroom:', error);
    }
  };
  const handleAssignTeacher=(e)=>{
    e.preventDefault();
    console.log(teacherId,classroomId);
    }
    
  return (
    
    <div className="bg-white shadow-md rounded-lg p-4">
      
      <h2 className="text-xl font-semibold mb-4">Create Classroom</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name">Classroom Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="startTime">Start Time</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="endTime">End Time</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="days">Days</label>
          <input
            type="text"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value.split(',').map(day => day.trim()))}
            className="input input-bordered w-full"
            placeholder="e.g., Monday, Wednesday"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="name"> Assign Teacher </label>
          <select value={teacher}  onChange={(e)=>{setTeacher(e.target.value)}} required className="select select-primary w-full max-w-xs">
  <option disabled >What is the best TV show?</option>
  <option>None</option>
  <option>Lost</option>
  <option>Breaking Bad</option>
  <option>Walking Dead</option>
</select>
        </div>
        <button type="submit" className="btn btn-primary">Create Classroom</button>
      </form>
      <h2 className="text-xl font-semibold mb-4">Assign Teacher to Classroom</h2>
      <form onSubmit={handleAssignTeacher}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="classroomId">Classroom ID</label>
          <input
            type="text"
            id="classroomId"
            value={classroomId}
            onChange={(e) => setClassroomId(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="teacherId">Teacher ID</label>
          <input
            type="text"
            id="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Assign Teacher</button>
      </form>
    </div>
  );
};

export default CreateClassroomForm;
