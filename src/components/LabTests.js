import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LabTests() {
  const [tests, setTests] = useState([]);
  const [testResult, setTestResult] = useState("");

  const navigate = useNavigate();
  const fetchTestDetails = async () => {
    const url = `http://127.0.0.1:8000/testlab/bookedtests/`;
    const data = await fetch(url);
    const parsedData = await data.json();
    parsedData.sort(
      (a, b) => new Date(b.booking_date) - new Date(a.booking_date)
    );
    setTests(parsedData);
  };

  useEffect(() => {
    fetchTestDetails();
    //eslint-disable-next-line
  }, []);

  const handleUploadResult = async (test_id) => {
    const data = {
      test_result_url: testResult,
    };

    fetch(`http://127.0.0.1:8000/testlab/uploadtestresults/${test_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/LabTests");
        fetchTestDetails();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/LabTests">
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
                  <Link className="nav-link" to="/LabTests">
                    All Booked Tests
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/OtherUserProfile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/TestList">
                    Tests Available
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/AddTest">
                    Add Test
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <button
            className="btn btn-dark mx-2"
            onClick={() => {
              navigate("/OtherUserLogin");
            }}
          >
            Logout
          </button>
        </nav>
      </div>

      <div>
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
                    <p className="mb-0 py-2">
                      Patient Name - {element.patient_name}
                    </p>
                    <p className="mb-0 py-2">Test Name - {element.test}</p>
                    <p className="mb-0 py-2">
                      Date Booked - {element.booking_date}
                    </p>
                    <p className="mb-0 py-2">Contact - {element.contact}</p>
                    <p className="float-end mb-0 py-2">
                      Total - ${element.total_price}
                    </p>
                    <div>
                      <div className="mb-0 py-2">
                        {element.test_result_url ? (
                          <p>
                            Result -
                            <a href={element.test_result_url}>Click Here</a>
                          </p>
                        ) : (
                          <div className="mb-3">
                            Result -
                            <textarea
                              className="form-control"
                              id="exampleFormControlTextarea1"
                              rows="3"
                              onChange={(e) => setTestResult(e.target.value)}
                            ></textarea>
                            <button
                              className="btn btn-dark float-end my-2"
                              onClick={() =>
                                handleUploadResult(element.test_id)
                              }
                            >
                              Upload Results
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
