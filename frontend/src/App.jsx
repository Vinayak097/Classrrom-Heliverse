import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import PrincipalDashboard from './pages/PrincipalDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import './App.css'
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
function App() {
  

  return (
    <>
    <div>
      <Navbar></Navbar>
    </div>
     <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        <Route path="/principal" element={<PrincipalDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
