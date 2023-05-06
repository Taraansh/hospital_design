// import React, { useEffect, useState } from 'react'
// import NavBar from './NavBar'

// export default function Appointment() {
//     const [doctors, setDoctors] = useState([])

//     const fetchDetails = async () => {
//         const url = `http://127.0.0.1:8000/otherusers/signup/`;
//         const data = await fetch(url);
//         const parsedData = await data.json();

//         console.log(parsedData)
//         setDoctors(parsedData)
//       }

//       useEffect(() => {
//         fetchDetails();
//         //eslint-disable-next-line
//       }, [])

// return (
//     <>
//       <NavBar />
//       <div className='container'>
//         {doctors.map((element, index) => {
//           return (
//             <div className="list-group" key={index}>
//               <a href="#" className="list-group-item list-group-item-action border-2 p-2 my-2" aria-current="true">{element.doctor_name} - {element.specification}</a>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
//     }

import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function Appointment(props) {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const fetchAppointmentDetails = async () => {
    const url = `http://127.0.0.1:8000/appointment/myappointment/${props.email}/`;
    const data = await fetch(url);
    const parsedData = await data.json();

    console.log(parsedData);
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
          const handleDeleteClick = async (orderId) => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this order?"
            );
            if (confirmDelete) {
              try {
                // Delete the specific order by making an API call
                const response = await fetch(
                  `http://127.0.0.1:8000/orders/order/${orderId}/`,
                  {
                    method: "DELETE",
                  }
                );
                if (response.ok) {
                  // Order successfully deleted, perform any necessary actions (e.g., refresh the order list)
                  console.log("Order deleted:", orderId);
                  fetchAppointmentDetails(); // Refresh the order list after deletion
                } else {
                  // Handle the case when the delete request fails
                  console.log("Failed to delete order:", orderId);
                }
              } catch (error) {
                // Handle any errors that occur during the delete operation
                console.error("Error deleting order:", error);
              }
            }
          };

          return (
            <div className="card list-group my-2">
              <div key={element.appointment_id}>
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
                  <p className="mb-0 py-2">Status - {element.status}</p>
                  <button
                    className="btn btn-dark float-end mb-2"
                    onClick={() => handleDeleteClick(element.appointment_id)}
                  >
                    Delete Record
                  </button>
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
