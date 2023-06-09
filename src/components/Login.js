import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `https://hospital-management-p6cm.onrender.com/patient/loginreq/${email}/${password}/`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "success") {
        const patient_email = data.email;
        const patient_password = data.password;

        localStorage.setItem("patient_email", patient_email);
        localStorage.setItem("patient_password", patient_password);
        navigate("/Appointment");
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
          navigate("/DoctorLogin");
        }}
      >
        Other User?
      </button>
      <div className="container">
        <div
          className="card mx-auto position-absolute top-50 start-50 translate-middle"
          style={{ width: "18rem", padding: "35px 20px" }}
        >
          <h5 className="card-title">Login</h5>
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
          <div id="newEmailSetUp" className="form-text mx-3">
            Need an accout? <Link to="/Signup">Sign up</Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
