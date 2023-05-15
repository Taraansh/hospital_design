import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OtherUserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://hospital-management-p6cm.onrender.com/otherusers/otheruser/${email}/${password}/`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "success") {
        const user_email = data.email;
        const user_password = data.password;

        localStorage.setItem("user_email", user_email);
        localStorage.setItem("user_password", user_password);
        if (data.specification === "Pharmacist") {
          navigate("/Pharmacy");
        } else if (data.specification === "Test Lab Attendant") {
          navigate("/LabTests");
        }
      } else {
        window.alert("Enter correct credentials");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <button
        className="btn btn-dark float-end m-4"
        onClick={() => {
          navigate("/");
        }}
      >
        Patient?
      </button>
      <div className="container">
        <div
          className="card mx-auto position-absolute top-50 start-50 translate-middle"
          style={{ width: "21rem", padding: "35px 20px" }}
        >
          <h5 className="card-title">Login</h5>
          <h6 className="card-title">(Lab Attendent and Pharmacist only)</h6>

          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="InputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="form-control"
                  id="InputEmail1"
                  aria-describedby="emailHelp"
                  autoComplete="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="InputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="form-control"
                  id="InputPassword1"
                  autoComplete="current-password"
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark d-grid gap-2 col-12 mx-auto"
                style={{ marginTop: "30px" }}
              >
                Login
              </button>
            </form>
          </div>
          {/* <div className="form-text mx-3">
            Need an accout?<Link to="/DoctorSignup">Sign up</Link>
          </div> */}
          <div className="form-text mx-3">
            Doctor?<Link to="/DoctorLogin">Click Here</Link>
          </div>
        </div>
      </div>
    </>
  );
}
