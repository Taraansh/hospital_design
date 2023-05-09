import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AddMedicine() {
  const [medicineName, setMedicineName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleAddMedicine = (event) => {
    event.preventDefault();

    const data = {
      medicine_name: medicineName,
      description: description,
      quantity: quantity,
      price: price,
    };

    fetch("http://127.0.0.1:8000/pharmacy/list/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/MedicineList");
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

      <div className="container">
        <h2 className="text-center">Add Medicine</h2>
        <form onSubmit={handleAddMedicine}>
          <div className="mb-3">
            <label htmlFor="medicine_name" className="form-label">
              Medicine Name
            </label>
            <input
              type="text"
              className="form-control"
              id="medicine_name"
              onChange={(e) => setMedicineName(e.target.value)}
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
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              onChange={(e) => setQuantity(e.target.value)}
            />
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
            Add Medicine
          </button>
        </form>
      </div>
    </>
  );
}
