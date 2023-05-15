import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('')
  const [contact, setContact] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      patient_first_name: firstName,
      patient_last_name: lastName,
      patient_dob: dob,
      patient_gender: gender,
      patient_contact: contact,
      patient_email: email,
      patient_address: address,
      patient_password: password,
    }

    fetch('https://hospital-management-p6cm.onrender.com/patient/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/")
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    
    <div className='container'>
      <h2 className='text-center my-3'>Enter Details</h2>
        <form className='my-2' onSubmit={handleSubmit}>

          <div className="container">      
            <div className="mb-3">
              <label htmlFor="patient_first_name" className="form-label">First Name</label>
              <input type="text" className="form-control" id="patient_first_name" name="patient_first_name" aria-describedby="FirstNameHelp" onChange={(e) => setFirstName(e.target.value)}/>
            </div>
          </div>

          <div className="container">
            <div className="mb-3">
              <label htmlFor="patient_last_name" className="form-label">Last Name</label>
              <input type="text" className="form-control" id="patient_last_name" name="patient_last_name" aria-describedby="LastNameHelp" onChange={(e) => setLastName(e.target.value)}/>
            </div>
          </div>

          <div className="container">
            <div className="mb-3">
              <label htmlFor="patient_dob" className="form-label">Date of Birth</label>
              <input type="date" className="form-control" id="patient_dob" name="patient_dob" aria-describedby="DOBHelp" onChange={(e) => setDOB(e.target.value)}/>
            </div>
         </div>

          <div className="container">
            <div className="mb-3">
              <label htmlFor="Gender" className="form-label">Gender</label>
              <select className="form-select" aria-label="Default select example" name="patient_gender" defaultValue="Choose a Gender" onChange={(e) => setGender(e.target.value)}>
                <option value="Choose a Gender">Choose a Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="container">
            <div className="mb-3">
              <label htmlFor="ContactNumber" className="form-label">Contact No.</label>
              <input type="tel" className="form-control" id="ContactNumber" name="patient_contact" aria-describedby="ContactHelp" onChange={(e) => setContact(e.target.value)}/>
            </div>
          </div>

          <div className="container">
            <div className="mb-3">
              <label htmlFor="InputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" name="patient_email" autoComplete='email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>

          <div className="container">
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address</label>
              <input type="text" className="form-control" id="Address" aria-describedby="addressHelp" name="patient_address" onChange={(e) => setAddress(e.target.value)}/>
            </div>
          </div>

          <div className="container">
            <div className="mb-3">
              <label htmlFor="InputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" id="InputPassword1" name="patient_password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>

          <button type="submit" className="btn btn-dark d-grid gap-2 col-3 mx-auto my-4" >Submit</button>

        </form>
    </div>
  )
}
