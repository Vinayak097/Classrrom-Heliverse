// src/components/Dashboard/CreateClassroomForm.jsx
import React, {  useState } from 'react';
import axios from 'axios';
import { UnassignedTeachers } from '../../recoil/atoms';
import {  useRecoilValue } from 'recoil';
import { backend_url } from '../../config';

const CreateClassroomForm = () => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);
  const [teacher,setTeacher]=useState('');
  const allTeachers=useRecoilValue(UnassignedTeachers);
  const [loading,setloading]=useState(false);
  const [success,setsuccess]=useState('');
  const [error,seterror]=useState('');
  console.log("allteacchers",allTeachers)
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    if(teacher==''||teacher==="none"){
      seterror('select teacher');
      setsuccess('')
      return;
    }
    try {
      await axios.post(`${backend_url}/api/classrooms`, {
        name,
        startTime,
        endTime,
        days,
        teacherName:teacher
      },
      {
      headers:{
        "authorization":localStorage.getItem('authToken')
      }}
    );
      // Handle success
      setloading(false)
      setsuccess("successfully created")
      seterror('')
      console.log("successfully created")
    } catch (error) {
      setloading(false)
      seterror('error In internal')
      setsuccess('')
      console.error('Error creating classroom:', error);
    }
  };
  
   
    
  return (
    
    <div className="bg-white shadow-md rounded-lg p-4">
      
      <h2 className="text-xl font-semibold mb-4">Create Classroom</h2>
      <p className='text-green-500'>{success}</p>
      <p className='text-red-500'>{error}</p>

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
          <label className="block text-sm font-medium mb-1" htmlFor="nothing"> Assign Teacher </label>
            <select  value={teacher}  onChange={(e)=>{setTeacher(e.target.value)}} required className="select select-primary w-full max-w-xs">
              <option>select teacher</option>            
              {allTeachers.map((teach)=>(
                <option key={teach._id} >{teach.name?teach.name:"tacher"}</option>                
              ))}
              
              
              
              
            </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {loading?<span className="loading loading-infinity loading-xs"></span>:
          'Create Classroom'}</button>
      </form>
     
    </div>
  );
};

export default CreateClassroomForm;
