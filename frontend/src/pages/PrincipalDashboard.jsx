import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TeacherList from '../components/Principal/TeacherList';
import StudentList from '../components/Principal/StudentList';
import CreateClassroomForm from '../components/Principal/ClassroomForm';
import ClassroomsCard from '../components/Principal/ClassroomsCard';
import { getAllClassrooms } from '../utils/api';
import { ClassRooms } from '../recoil/atoms';
import { useRecoilState } from 'recoil';
import RegisterForm from '../components/auth/Register';
import { Button } from 'react-bootstrap';
import { FaArrowUp } from 'react-icons/fa';


const PrincipalDashboard = () => {
  const [classroom,setClassrooms]=useRecoilState(ClassRooms);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page,setpage]=useState();
  
  
  
  useEffect( () => {
    const classrooms=async()=>{
    const data= await getAllClassrooms();
    console.log("data")
    console.log(data);
    setClassrooms(data);      
    }
    classrooms();
  }, []); 
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto p-4">
      <div className='flex justify-between'>
      <h1 className="text-2xl font-bold mb-4">Principal Dashboard</h1>
      <div className='flex gap-4'>
        <a href="#class">CreateClass</a>
        <a href="#list" className='cursor-pointer'>Teachers/Students</a>
        <a href="#adduser" className='cursor-pointer'>create account</a>

      </div>

      </div>
      

      <div className='h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {classroom.length > 0 ? (
    classroom.map((room) => (
      <ClassroomsCard
        key={room._id} // Add a unique key for each item
        name={room.name}
        teacher={room.teacher}
        students={room.students}
      />
    ))
  ) : (
    <div>Classrooms are empty</div>
  )}
     
      
      </div>
      <div id='list' className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
        <TeacherList />
        <StudentList />
      </div>
      <div id='class' className="mt-8">
        <CreateClassroomForm />
      </div>
      <div id='adduser' className="mt-8">
        <RegisterForm header={"Teacher/Student"} />
      </div>
      <Button 
      onClick={scrollToTop} 
      className="fixed bottom-4 right-4" 
      variant="primary" 
      size="lg"
    >
      <FaArrowUp />
    </Button>
    </div>
  );
};

export default PrincipalDashboard;
