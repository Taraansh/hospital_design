import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function DoctorProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const doctorEmail = localStorage.getItem("doctor_email");
    const doctorPassword = localStorage.getItem("doctor_password");
    setEmail(doctorEmail);
    setPassword(doctorPassword);
  }, [email, password]);

  // States to display details in the profile
  const [doctorName, setDoctorName] = useState("");
  const [specification, setSpecification] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [morningAvailability, setMorningAvailability] = useState("");
  const [eveningAvailability, setEveningAvailability] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);
  const navigate = useNavigate();

  localStorage.setItem("doctorName", doctorName);

  // State to update the details in the profile
  const [changeMorningAvailability, setChangeMorningAvailability] =
    useState("");
  const [changeEveningAvailability, setChangeEveningAvailability] =
    useState("");

  const handleDetails = async () => {
    const url = `http://127.0.0.1:8000/otherusers/profile/${localStorage.getItem(
      "doctor_email"
    )}/${localStorage.getItem("doctor_password")}/`;

    const response = await fetch(url);
    const data = await response.json();

    setDoctorName(data.doctor_name);
    setSpecification(data.specification);
    setDoctorEmail(data.doctor_email);
    setMorningAvailability(data.morning_available);
    setEveningAvailability(data.evening_available);
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

  const handlePut = (event) => {
    event.preventDefault();

    const data = {
      morning_available: changeMorningAvailability
        ? changeMorningAvailability
        : morningAvailability,
      evening_available: changeEveningAvailability
        ? changeEveningAvailability
        : eveningAvailability,
    };

    fetch(
      `http://127.0.0.1:8000/otherusers/modify/${localStorage.getItem(
        "doctor_email"
      )}/${localStorage.getItem("doctor_password")}/`,
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
        navigate("/MyAppointment");
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
        {isUpdate ? (
          <div className=" container">
            <h2 className="text-center">Profile</h2>
            <div className=" container">
              <h5>Name</h5>
              <p>{doctorName}</p>
              <h5>Specification</h5>
              <p>{specification}</p>
              <h5>Email</h5>
              <p>{doctorEmail}</p>
              <h5>Morning</h5>
              <p>{morningAvailability}</p>
              <h5>Evening</h5>
              <p>{eveningAvailability}</p>
              <button className="btn btn-dark my-2" onClick={handleUpdate}>
                Update Availability
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-center">Change Availability</h2>
            <form className="my-2" onSubmit={handlePut}>
              <div className="container">
                <div className="mb-3">
                  <label htmlFor="doctor_name" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="doctor_name"
                    name="doctor_name"
                    aria-describedby="DoctorNameHelp"
                    defaultValue={doctorName}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="specification" className="form-label">
                    Specification
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="specification"
                    name="specification"
                    aria-describedby="specificationHelp"
                    value={specification}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="doctorEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="doctorEmail"
                    aria-describedby="emailHelp"
                    name="doctorEmail"
                    autoComplete="email"
                    value={doctorEmail}
                    readOnly
                    disabled
                  />
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="morningAvailability" className="form-label">
                    Available in Morning?
                  </label>
                  <select
                    className="form-select"
                    id="morningAvailability"
                    name="morning_available"
                    aria-label="Floating label select example"
                    onChange={(e) => {
                      setChangeMorningAvailability(e.target.value);
                    }}
                  >
                    <option selected value="Choose an option">
                      Choose an option
                    </option>
                    <option value="available">Available</option>
                    <option value="not available">Not Available</option>
                  </select>
                </div>
              </div>

              <div className="container">
                <div className="mb-3">
                  <label htmlFor="eveningAvailability" className="form-label">
                    Available in Evening?
                  </label>

                  <select
                    className="form-select"
                    id="eveningAvailability"
                    name="evening_available"
                    aria-label="Floating label select example"
                    onChange={(e) => {
                      setChangeEveningAvailability(e.target.value);
                    }}
                  >
                    <option selected value="Choose an option">
                      Choose an option
                    </option>
                    <option value="available">Available</option>
                    <option value="not available">Not Available</option>
                  </select>
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
                    name="doctor_password"
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
