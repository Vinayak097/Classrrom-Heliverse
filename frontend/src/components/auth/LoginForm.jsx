// src/features/auth/Login.js
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState  } from '../../recoil/atoms';
import { login } from '../../utils/api'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useRecoilState(authState); // Recoil state
  const [loginerror,setloginerror]=useState('');
  const [loading,setloading]=useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      
      const response= await login({email,password});
      
      if(response===undefined){
        throw new Error
      }
      const data= response.data;
      
      console.log("this data" ,data);
      if(!data|| !data.user){
        setloginerror(response.response.data.message);
        setloading(false)
        return;
      }
      const user=data.user;
      localStorage.setItem('authToken', data.token);

      setAuth(user);
      
      if (user.role === 'Principal') {
        navigate('/principal');
      } else if (user.role === 'Teacher') {
        navigate('/teacher');
      } else if (user.role === 'Student') {
        navigate('/student');
      } else {
        navigate('/'); 
      }
      setloading(false)
    } catch (error) {
      setloading(false)
      setloginerror("error during login")
      
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" onChange={(e)=>{setEmail(e.target.value)}} className="grow" placeholder="Email" required />
</label>
          </div>
          <div className="mb-4">
          <label className="input input-bordered flex items-center gap-2">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" onChange={(e)=>{setPassword(e.target.value)}} className="grow" placeholder="Email" required />
</label>
          </div>
          <p className='text-red-500 text-sm mb-4'>{loginerror?loginerror:""}</p>

          <button type='submit' className=" btn btn-outline w-full ">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
