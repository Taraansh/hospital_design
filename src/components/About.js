import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function About() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const patientEmail = localStorage.getItem("patient_email");
    const patientPassword = localStorage.getItem("patient_password");
    setEmail(patientEmail);
    setPassword(patientPassword);
  }, [email, password]);

  // States to display details in the profile
  const [patientFirstName, setPatientFirstName] = useState("");
  const [patientLastName, setPatientLastName] = useState("");
  const [patientDateOfBirth, setPatientDateOfBirth] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [patientContact, setPatientContact] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);

  // State to update the details in the profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleDetails = async () => {
    // const url = `https://hospital-management-p6cm.onrender.com/patient/profile/${props.email}/${props.password}/`;
    const url = `https://hospital-management-p6cm.onrender.com/patient/profile/${localStorage.getItem(
      "patient_email"
    )}/${localStorage.getItem("patient_password")}/`;

    const response = await fetch(url);
    const data = await response.json();

    setPatientFirstName(data.patient_first_name);
    setPatientLastName(data.patient_last_name);
    setPatientDateOfBirth(data.patient_dob);
    setPatientAge(data.patient_age);
    setPatientGender(data.patient_gender);
    setPatientContact(data.patient_contact);
    setPatientEmail(data.patient_email);
    setPatientAddress(data.patient_address);
  };

  useEffect(() => {
    handleDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = () => {
    if (isUpdate === false) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  };

  const handlePost = (event) => {
    event.preventDefault();

    const data = {
      patient_first_name: firstName ? firstName : patientFirstName,
      patient_last_name: lastName ? lastName : patientLastName,
      patient_dob: patientDateOfBirth,
      patient_gender: patientGender,
      patient_contact: contact ? contact : patientContact,
      patient_email: patientEmail,
      patient_address: address ? address : patientAddress,
    };

    fetch(
      `https://hospital-management-p6cm.onrender.com/patient/modify/${localStorage.getItem(
        "patient_email"
      )}/${localStorage.getItem("patient_password")}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this record?"
    );
    if (confirmDelete) {
      fetch(
        `https://hospital-management-p6cm.onrender.com/patient/modify/${localStorage.getItem(
          "patient_email"
        )}/${localStorage.getItem("patient_password")}/`,
        {
          method: "DELETE",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <NavBar />

      <div className="container">
        {isUpdate ? (
          <div className=" container">
            <h2 className="text-center">Profile</h2>
            <div className=" container">
              <h5>First Name</h5>
              <p>{patientFirstName}</p>
              <h5>Last Name</h5>
              <p>{patientLastName}</p>
              <h5>Date of Birth</h5>
              <p>{patientDateOfBirth}</p>
              <h5>Age</h5>
              <p>{patientAge} years</p>
              <h5>Gender</h5>
              <p>{patientGender}</p>
              <h5>Contact</h5>
              <p>{patientContact}</p>
              <h5>Email</h5>
              <p>{patientEmail}</p>
              <h5>Address</h5>
              <p>{patientAddress}</p>
              <button className="btn btn-dark my-2" onClick={handleUpdate}>
                Update Profile
              </button>
              <button
                className="btn btn-dark float-end my-2"
                onClick={handleDelete}
              >
                Delete Profile
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center">Edit Profile</h2>
            <form className="my-2" onSubmit={handlePost}>
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="patient_first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patient_first_name"
                    name="patient_first_name"
                    aria-describedby="FirstNameHelp"
                    defaultValue={patientFirstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="patient_last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="patient_last_name"
                    name="patient_last_name"
                    aria-describedby="LastNameHelp"
                    defaultValue={patientLastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="patient_dob" className="form-label">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="patient_dob"
                    name="patient_dob"
                    aria-describedby="DOBHelp"
                    value={patientDateOfBirth}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="Gender" className="form-label">
                    Gender
                  </label>
                  <input
                    className="form-select"
                    aria-label="Default select example"
                    name="patient_gender"
                    value={patientGender}
                    disabled
                  ></input>
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="ContactNumber" className="form-label">
                    Contact No.
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="ContactNumber"
                    name="patient_contact"
                    aria-describedby="ContactHelp"
                    defaultValue={patientContact}
                    onChange={(e) => {
                      setContact(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="InputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="InputEmail1"
                    aria-describedby="emailHelp"
                    name="patient_email"
                    autoComplete="email"
                    value={patientEmail}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="Address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="Address"
                    aria-describedby="addressHelp"
                    name="patient_address"
                    defaultValue={patientAddress}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="InputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="InputPassword1"
                    name="patient_password"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-dark d-grid gap-2 col-3 mx-auto my-4"
              >
                Submit
              </button>

              <button className="btn btn-dark" onClick={handleUpdate}>
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
