import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function BookTest() {
  const [testList, setTestList] = useState([]);
  const [testName, setTestName] = useState([]);
  const [bookingDate, setBookingDate] = useState([]);
  const [contact, setContact] = useState([]);
  const [price, setPrice] = useState([]);
  const navigate = useNavigate();

  const fetchTestList = async () => {
    const url = `https://hospital-management-p6cm.onrender.com/testlab/tests/`;
    const data = await fetch(url);
    const parsedData = await data.json();

    setTestList(parsedData);
  };

  useEffect(() => {
    fetchTestList();
    //eslint-disable-next-line
  }, []);

  const handleBookTestClick = () => {
    navigate("/Orders");
  };

  const handleBookTest = (event) => {
    event.preventDefault();

    const data = {
      test: testName,
      booking_date: bookingDate,
      contact: contact,
      total_price: price,
    };

    fetch(
      `https://hospital-management-p6cm.onrender.com/testlab/test/${localStorage.getItem(
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
        navigate("/Tests");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleTestChange = (event) => {
    const selectedTest = testList.find(
      (element) => element.name === event.target.value
    );
    const totalPrice = selectedTest ? selectedTest.price : 0;
    setTestName(event.target.value);
    setPrice(totalPrice);
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="container">
          <form onSubmit={handleBookTest}>
            <h4 className="text-center">Book a Test</h4>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="test_name" className="form-label">
                  Select Test
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="test_name"
                  defaultValue="Book a Test"
                  onChange={handleTestChange}
                >
                  <option value="ChooseMedicine">Choose a Test</option>
                  {testList.map((element, index) => {
                    return (
                      <option key={index} value={element.name}>
                        {element.name} - {element.description} - $
                        {element.price}
                      </option>
                    );
                  })}
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
                  onChange={(e) => setBookingDate(e.target.value)}
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
                  value={price}
                  readOnly
                />
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
                  name="contact"
                  aria-describedby="ContactHelp"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-dark mx-1">
              Confirm Test
            </button>
            <button className="btn btn-dark mx-1" onClick={handleBookTestClick}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
