const credentials = {
  email: "principal@classroom.com",
  password: "Admin"
};
import axios from "axios";
import { backend_url } from "../config";
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${backend_url}/api/auth/login`, credentials);
    console.log('pringssts')
    console.log(response);
    return response;
    
  } catch (error) {

    return error;
  }
};

export const getAllClassrooms = async () => {
  try {
    const response = await axios.get(`${backend_url}/api/classrooms`, {
      headers: {
        'Authorization': `${localStorage.getItem('authToken')}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching classrooms:', error.response ? error.response.data : error.message);
    return [];
  }
};


export   const fetchstudents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/students', {
        headers:{'Authorization':localStorage.getItem('authToken')}, // Include cookies in the request
      });
      return response.data ;
    } catch (error) {

      console.error('Error fetching students:', error.response ? error.response.data : error.message);
      return [];
    }
  };



  // api/timetable.js



// Base URL for your API
const API_URL = 'localhost:8000/api/timetables/';

// Fetch all timetables
export const fetchTimetables = async () => {
  const response = await axios.get(API_URL,{
    headers:{
      "Authorization":localStorage.getItem("authToken")
    }
  });
  return response.data;
};

// Create a new timetable
export const createTimetable = async (timetable) => {
  const response = await axios.post(API_URL, timetable);
  return response.data;
};

// Update a timetable
export const updateTimetable = async (id, timetable) => {
  const response = await axios.put(`${API_URL}/${id}`, timetable);
  return response.data;
};

// Delete a timetable
export const deleteTimetable = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
