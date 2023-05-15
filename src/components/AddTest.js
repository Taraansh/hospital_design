import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AddTest() {
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleAddTest = (event) => {
    event.preventDefault();

    const data = {
      test_name: testName,
      description: description,
      price: price,
    };

    fetch("https://hospital-management-p6cm.onrender.com/testlab/tests/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/TestList");
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

      <div className="container">
        <h2 className="text-center">Add Test</h2>
        <form onSubmit={handleAddTest}>
          <div className="mb-3">
            <label htmlFor="test_name" className="form-label">
              Test Name
            </label>
            <input
              type="text"
              className="form-control"
              id="test_name"
              onChange={(e) => setTestName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="2"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="text"
              className="form-control"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <button className="btn btn-dark" type="submit">
            Add Test
          </button>
        </form>
      </div>
    </>
  );
}
