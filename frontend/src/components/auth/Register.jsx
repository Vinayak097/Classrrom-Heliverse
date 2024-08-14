import React, { useState } from 'react';
import axios from 'axios';
import { backend_url } from '../../config';

const RegisterForm = ({header}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [role,setrole]=useState('Teacher');
  const [loading,setloading]=useState(false);


  

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const response = await axios.post(`${backend_url}/api/auth/register`, {
        email,
        password,
        name,
        role:role
      }, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}` // Include token for authentication
        }
      });
      if(role==="Student"){
        setSuccess('Student registered successfully!');
      }else{
        setSuccess('Teacher registered successfully!');

      }
      setloading(false);
      setEmail('');
      setPassword('');
      setName('');
      setError('');
    } catch (err) {
      setloading(false);
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Add {header}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className='mb-4'>
        <label  className="block text-sm font-medium text-gray-700">Role</label>
        <select onChange={(e)=>{setrole(e.target.value)}} className="select select-bordered w-full max-w-xs">
  <option disabled selected>Teacher</option>
  <option>Student</option>
  
</select>
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >{loading? <span className="loading loading-infinity loading-xs"></span>:
          'Register Teacher'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
