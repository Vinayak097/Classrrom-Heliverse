import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {useNavigate} from 'react-router-dom'
import { authState } from '../recoil/atoms'



function TeacherDashboard() {
  const navigate=useNavigate()
  const teacher=useRecoilValue(authState);
  const [message,setmessage]=useState();
  console.log(student);
  useEffect(()=>{
    if(!student){
      navigate("/")
    }
    if(!student?.classroom){
      setmessage("please ask to add in classroom");
    }

  })
  
  

  return (
    
      <div className="container mx-auto p-4">
      <div className='flex justify-between'>
        <h1>TeacherDashboard</h1>
      </div>
      <div className='flex items-center text-violet-800 justify-center'>
          {message}
      </div>
      <div>

      </div>      

      
    </div>
  )
}

export default TeacherDashboard