import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointmentDetails = async () => {
    const url = `http://127.0.0.1:8000/appointment/upcoming/${localStorage.getItem(
        "doctorName"
      )}/`;
    const data = await fetch(url);
    const parsedData = await data.json();
    parsedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAppointments(parsedData);
  };

  useEffect(() => {
    fetchAppointmentDetails();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/MyAppointment">
              Hospital
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/MyAppointment">
                    Appointments
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/DoctorProfile">
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <button
            className="btn btn-dark mx-2"
            onClick={() => {
              navigate("/DoctorLogin");
            }}
          >
            Logout
          </button>
        </nav>
      </div>
      <div className="container">
        {appointments.map((element, index) => {
          return (
            <div className="card list-group my-2" key={element.appointment_id}>
              <div>
                <div
                  className="list-group-item-action py-2 px-3"
                  style={{ textDecoration: "none", color: "currentcolor" }}
                  aria-current="true"
                >
                  <p className="mb-0 py-2">Patient Name - {element.patient_name}</p>
                  <p className="mb-0 py-2">Doctor Name - {element.doctor}</p>
                  <p className="mb-0 py-2">Date Booked - {element.date}</p>
                  <p className="mb-0 py-2">Time - {element.timing}</p>
                  <p className="float-end mb-1">Total - ${element.total_price}</p>
                  <p className="mb-0 py-2">Reason - {element.reason}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
