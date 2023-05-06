import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function BookAppointment(props) {
  const [doctorList, setDoctorList] = useState([]);
  const [doctorName, setDoctorName] = useState([]);
  const [timing, setTiming] = useState([]);
  const [reason, setReason] = useState([]);
  const [morningAvailability, setMorningAvailability] = useState([]);
  const [eveningAvailability, setEveningAvailability] = useState([]);
  const navigate = useNavigate();

  const price = 5;
  const status = "Requested";

  const fetchDoctorsList = async () => {
    const url = `http://127.0.0.1:8000/otherusers/doctors/`;
    const data = await fetch(url);
    const parsedData = await data.json();

    setDoctorList(parsedData);
  };

  const handleDoctorChange = (event) => {
    setDoctorName(event.target.value);
    getDoctorAvailability(event.target.value)
  };

  const getDoctorAvailability = (doctorName) => {
    const doctor = doctorList.find(
      (element) => element.doctor_name === doctorName
    );

    if(doctor.morning_available === 'available'){
      const morning = doctor.morning_available;
      setMorningAvailability(morning);
    }
    else{
      setMorningAvailability('not available')
    }

    if(doctor.evening_available === 'available'){
      const evening = doctor.evening_available;
      setEveningAvailability(evening);
    }
    else{
      setEveningAvailability('not available')
    }
    
    
  };

  useEffect(() => {
    fetchDoctorsList();
    //eslint-disable-next-line
  }, []);

  const handleCancelClick = () => {
    navigate("/Appointment");
  };

  const handleBookAppointment = (event) => {
    event.preventDefault();

    const data = {
      doctor: doctorName,
      timing: timing,
      status: status,
      reason: reason,
      total_price: price,
    };

    fetch(
      `http://127.0.0.1:8000/appointment/book/${localStorage.getItem(
        "patient_email"
      )}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        navigate("/Appointment");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="container">
          <form onSubmit={handleBookAppointment}>
            <h4 className="text-center">Book an Appointment</h4>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="doctor_name" className="form-label">
                  Select a Doctor
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="doctor_name"
                  defaultValue="Book an Appointment"
                  onChange={handleDoctorChange}
                >
                  <option value="ChooseDoctor">Choose a Doctor</option>
                  {doctorList.map((element, index) => {
                    return (
                      <option key={index} value={element.doctor_name}>
                        {element.doctor_name} - {element.specification}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="time_slot" className="form-label">
                  Choose a Slot
                </label>
                <select
                  className="form-select"
                  id="time_slot"
                  aria-label="Default select example"
                  name="timeslot"
                  onChange={(event)=> {setTiming(event.target.value)}}
                >
                  {morningAvailability === "available" ? (
                    <option value="Morning">Morning</option>
                  ) : (
                    <option value="" disabled>
                      Morning (not available)
                    </option>
                  )}
                  {eveningAvailability === "available" ? (
                    <option value="Evening">Evening</option>
                  ) : (
                    <option value="" disabled>
                      Evening (not available)
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="booking_date" className="form-label">
                  Select a Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="booking_date"
                  name="booking_date"
                  aria-describedby="DateHelp"
                  value={new Date().toLocaleDateString('en-CA')}
                  readOnly
                  disabled
                />
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="total_price" className="form-label">
                  Total Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="total_price"
                  name="total_price"
                  aria-describedby="PriceHelp"
                  value={"$" + price}
                  readOnly
                />
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="reason" className="form-label">
                  State Your reason
                </label>
                <textarea
                  className="form-control"
                  id="reason"
                  name="reason"
                  rows="3"
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div className="container">
              <button type="submit" className="btn btn-dark my-2">
                Book Appointment
              </button>
              <button className="btn btn-dark mx-2" onClick={handleCancelClick}>
                Cancel Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
