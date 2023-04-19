import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';

export default function About(props) {
    const [patientFirstName, setPatientFirstName] = useState('');
    const [patientLastName, setPatientLastName] = useState('');
    const [patientDateOfBirth, setPatientDateOfBirth] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientGender, setPatientGender] = useState('');
    const [patientContact, setPatientContact] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [patientAddress, setPatientAddress] = useState('');

    const handleDetails = async () => {
        const url = `http://127.0.0.1:8000/patient/profile/${props.email}/${props.password}/`
        const response = await fetch(url);
        const data = await response.json();

        console.log(data)
        setPatientFirstName(data.patient_first_name);
        setPatientLastName(data.patient_last_name)
        setPatientDateOfBirth(data.patient_dob)
        setPatientAge(data.patient_age)
        setPatientGender(data.patient_gender)
        setPatientContact(data.patient_contact)
        setPatientEmail(data.patient_email)
        setPatientAddress(data.patient_address)
    }

    useEffect(() => {
    handleDetails()
        console.log('Component loaded!');
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

  return (
    <>
      <NavBar />
      <div className='container'>
        <h2>Profile</h2>
        <h4>First Name</h4>
        <p>{patientFirstName}</p>
        <h4>Last Name</h4>
        <p>{patientLastName}</p>
        <h4>Date of Birth</h4>
        <p>{patientDateOfBirth}</p>
        <h4>Age</h4>
        <p>{patientAge}</p>
        <h4>Gender</h4>
        <p>{patientGender}</p>
        <h4>Contact</h4>
        <p>{patientContact}</p>
        <h4>Email</h4>
        <p>{patientEmail}</p>
        <h4>Address</h4>
        <p>{patientAddress}</p>

      </div>
    </>
  );
}
