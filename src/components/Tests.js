import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function Tests(props) {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  const fetchTestDetails = async () => {
    const url = `https://hospital-management-p6cm.onrender.com/testlab/mytests/${localStorage.getItem('patient_email')}/`;
    const data = await fetch(url);
    const parsedData = await data.json();

    setTests(parsedData);
  };

  useEffect(() => {
    fetchTestDetails();
    //eslint-disable-next-line
  }, []);

  const handleBookTestClick = () => {
    navigate("/BookTest");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        {tests.map((element, index) => {

          return (
            <div className="card list-group my-2" key={element.test_id}>
              <div key={index}>
                <div
                  className="list-group-item-action py-2 px-3"
                  style={{ textDecoration: "none", color: "currentcolor" }}
                  aria-current="true"
                >
                  <p className="mb-0 py-2">Patient Name - {element.patient_name}</p>
                  <p className="mb-0 py-2">
                  Test Name - {element.test}
                  </p>
                  <p className="mb-0 py-2">
                  Date Booked - {element.booking_date}
                  </p>
                  <p className="mb-0 py-2">Contact - {element.contact}</p>
                  <p className="float-end">
                    Total - ${element.total_price}
                  </p>
                  <p className="mb-0 py-2">Result - <a href={`{element.status}`}>Click Here</a></p>
                </div>
              </div>
            </div>
          );
        })}
        <button
          className="btn btn-dark float-end my-2"
          onClick={handleBookTestClick}
        >
          Book a Test
        </button>
      </div>
    </>
  );
}
