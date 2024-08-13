import axios from "axios";

// let config = {
//   method: 'get',
//   maxBodyLength: Infinity,
//   url: 'localhost:8000/api/classrooms',
//   headers: { 
//     'Cookie': 'authToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByaW5jaXBhbEBjbGFzc3Jvb20uY29tIiwicm9sZSI6IlByaW5jaXBhbCIsImlhdCI6MTcyMzU1MzA2MX0.BMA838Dc4Rt4qpvhrs96waO0yG1oyw7gR4n1rS--bn8'
//   }
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });


export const getAllClassrooms = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/classrooms', {
      withCredentials: true, // Include cookies with requests
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching classrooms:', error.response ? error.response.data : error.message);
    return [];
  }
};
const res=getAllClassrooms();
console.log(res);
const response=axios.get('http://localhost:8000/test',{withCredentials:true})
//console.log(response);