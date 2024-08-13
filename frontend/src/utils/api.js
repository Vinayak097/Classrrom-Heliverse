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
