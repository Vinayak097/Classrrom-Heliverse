// src/components/Dashboard/PrincipalDashboard.jsx
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import TeacherList from '../components/Principal/TeacherList';
import StudentList from '../components/Principal/StudentList';
import CreateClassroomForm from '../components/Principal/ClassroomForm';
import ClassroomsCard from '../components/Principal/ClassroomsCard';
import { backend_url } from '../config';
import { getAllClassrooms } from '../utils/api';
import { ClassRooms } from '../recoil/atoms';
import { useRecoilState } from 'recoil';

const PrincipalDashboard = () => {
  const [classroom,setClassrooms]=useRecoilState(ClassRooms);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  console.log(classroom);
  
  useEffect( () => {
    const classrooms=async()=>{
    const data= await getAllClassrooms();
    console.log("data")
    console.log(data);
    setClassrooms(data);      
    }
    classrooms();
  }, []); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Principal Dashboard</h1>
      <div className='h-full w-full'>
        {classroom ?
        classroom.map(room=>{
          
          <ClassroomsCard name={"room.name"} teacher={"room.teacher"} students={"room.students"}></ClassroomsCard>
        })
      :<div> classrooms are  empty</div>}
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TeacherList />
        <StudentList />
      </div>
      <div className="mt-8">
        <CreateClassroomForm />
      </div>
      {/* <div className="mt-8">
        <AssignTeacherForm />
      </div> */}
    </div>
  );
};

export default PrincipalDashboard;
