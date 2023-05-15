import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function OtherUserProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("user_email");
    const userPassword = localStorage.getItem("user_password");
    setEmail(userEmail);
    setPassword(userPassword);
  }, [email, password]);

  // States to display details in the profile
  const [userName, setUserName] = useState("");
  const [specification, setSpecification] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const handleDetails = async () => {
    const url = `https://hospital-management-p6cm.onrender.com/otherusers/otherprofile/${localStorage.getItem(
      "user_email"
    )}/${localStorage.getItem("user_password")}/`;

    const response = await fetch(url);
    const data = await response.json();

    setUserName(data.user_name);
    setSpecification(data.specification);
    setUserEmail(data.user_email);
  };

  useEffect(() => {
    handleDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {specification === "Pharmacist" ? (
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/Pharmacy">
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
                    <Link className="nav-link" to="/Pharmacy">
                      All Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/OtherUserProfile">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/MedicineList">
                      Medicines
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/AddMedicine">
                      Add Medicine
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
      ) : (
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
      )}

      <div className="container">
        <div className=" container">
          <h2 className="text-center">Profile</h2>
          <div className=" container">
            <h5>Name</h5>
            <p>{userName}</p>
            <h5>Specification</h5>
            <p>{specification}</p>
            <h5>Email</h5>
            <p>{userEmail}</p>
          </div>
        </div>
      </div>
    </>
  );
}
