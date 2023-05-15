import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function Appointment(props) {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointmentDetails = async () => {
    const url = `https://hospital-management-p6cm.onrender.com/appointment/myappointment/${localStorage.getItem(
      "patient_email"
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

  const handleAppointmnetClick = () => {
    navigate("/BookAppointment");
  };

  return (
    <>
      <NavBar />
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
                  <p className="mb-0 py-2">
                    Patient Name - {element.patient_name}
                  </p>
                  <p className="mb-0 py-2">Doctor Name - {element.doctor}</p>
                  <p className="mb-0 py-2">Date Booked - {element.date}</p>
                  <p className="mb-0 py-2">Time - {element.timing}</p>
                  <p className="float-end mb-1">
                    Total - ${element.total_price}
                  </p>
                  <p className="mb-0 py-2">Reason - {element.reason}</p>
                </div>
              </div>
            </div>
          );
        })}
        <button
          className="btn btn-dark float-end my-2"
          onClick={handleAppointmnetClick}
        >
          Book an Appointment
        </button>
      </div>
    </>
  );
}
