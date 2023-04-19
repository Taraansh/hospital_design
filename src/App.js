import React, { useState } from 'react';
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import About from "./components/About";

function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (patient_email, patient_password) => {
    setEmail(patient_email);
    setPassword(patient_password);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}/>} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home email={email} password={password}/>} />
        <Route path="/About" element={<About email={email} password={password}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
