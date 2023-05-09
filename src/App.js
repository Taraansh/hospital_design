import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Appointment from "./components/Appointment";
import Orders from "./components/Orders";
import PlaceOrder from "./components/PlaceOrder";
import Tests from "./components/Tests";
import BookTest from "./components/BookTest";
import BookAppointment from "./components/BookAppointment";
import DoctorLogin from "./components/DoctorLogin";
import OtherUserLogin from "./components/OtherUserLogin";
import MyAppointment from "./components/MyAppointment";
import DoctorProfile from "./components/DoctorProfile";
import Pharmacy from "./components/Pharmacy";
import LabTests from "./components/LabTests";
import OtherUserProfile from "./components/OtherUserProfile";
import AddMedicine from "./components/AddMedicine";
import MedicineList from "./components/MedicineList";
import AddTest from "./components/AddTest";
import TestList from "./components/TestList";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const patientEmail = localStorage.getItem("patient_email");
    const patientPassword = localStorage.getItem("patient_password");
    setEmail(patientEmail);
    setPassword(patientPassword);
  }, [email, password]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/PlaceOrder" element={<PlaceOrder />} />
        <Route path="/Tests" element={<Tests />} />
        <Route path="/BookTest" element={<BookTest />} />
        <Route path="/BookAppointment" element={<BookAppointment />} />

        <Route path="/DoctorLogin" element={<DoctorLogin />} />
        <Route path="/DoctorProfile" element={<DoctorProfile />} />
        <Route path="/MyAppointment" element={<MyAppointment />} />

        <Route path="/OtherUserLogin" element={<OtherUserLogin />} />
        <Route path="/OtherUserProfile" element={<OtherUserProfile />} />

        <Route path="/Pharmacy" element={<Pharmacy />} />
        <Route path="/AddMedicine" element={<AddMedicine />} />
        <Route path="/MedicineList" element={<MedicineList />} />

        <Route path="/LabTests" element={<LabTests />} />
        <Route path="/AddTest" element={<AddTest />} />
        <Route path="/TestList" element={<TestList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
