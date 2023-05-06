import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {
    const navigate = useNavigate();
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/Appointment">Hospital</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Appointment">Appointments</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Tests">Tests</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Orders">Medicines</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/About">Profile</Link>
                        </li>
                    </ul>
                </div>
            </div>

            <button className="btn btn-dark mx-2" onClick={()=> {navigate('/')}}>Logout</button>
        </nav>
    </div>
  )
}
