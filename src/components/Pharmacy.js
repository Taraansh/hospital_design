import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Pharmacy() {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState("");

  const navigate = useNavigate();
  const fetchOrderDetails = async () => {
    const url = `http://127.0.0.1:8000/orders/allorders/`;
    const data = await fetch(url);
    const parsedData = await data.json();
    parsedData.sort(
      (a, b) => new Date(b.date_created) - new Date(a.date_created)
    );
    setOrders(parsedData);
  };

  useEffect(() => {
    fetchOrderDetails();
    //eslint-disable-next-line
  }, []);

  const handleStatusChange = async (order_id) => {
    const data = {
      status: orderStatus,
    };

    fetch(
      //   `http://127.0.0.1:8000/otherusers/modify/${localStorage.getItem(
      //     "doctor_email"
      //   )}/${localStorage.getItem("doctor_password")}/`
      `http://127.0.0.1:8000/orders/order/${order_id}/status/`,
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
        navigate("/Pharmacy");
        fetchOrderDetails();
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
          {orders.map((element, index) => {
            return (
              <div className="card list-group my-2" key={element.order_id}>
                <div key={index}>
                  <div
                    className="list-group-item-action py-2 px-3"
                    style={{ textDecoration: "none", color: "currentcolor" }}
                    aria-current="true"
                  >
                    <p className="mb-0 py-2">
                      Patient Name - {element.patient_name}
                    </p>
                    <p className="mb-0 py-2">
                      Medicine Name - {element.medicine_name}
                    </p>
                    <p className="mb-0 py-2">Quantity - {element.quantity}</p>
                    <p className="mb-0 py-2">
                      Date Ordered - {element.date_created}
                    </p>
                    <p className="mb-0 py-2">
                      Address - {element.delivery_address}
                    </p>
                    <p className="mb-0 py-2">Contact - {element.contact}</p>
                    <p className="float-end mb-0 py-2">
                      Total - ${element.total_price}
                    </p>
                    <div>
                      <div className="mb-0 py-2">
                        <div className="mb-3">
                          Change Status -
                          <select
                            className="form-select"
                            id="orderStatusSelect"
                            aria-label="Floating label select example"
                            onChange={(e) => setOrderStatus(e.target.value)}
                            defaultValue={element.status}
                            style={{ width: "20rem" }}
                          >
                            {/* <option selected>Open this select menu</option> */}
                            <option value="PENDING">PENDING</option>
                            <option value="IN_PROCESS">IN PROCESS</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                          <button
                            className="btn btn-dark float-end my-2"
                            onClick={() => handleStatusChange(element.order_id)}
                          >
                            Upload Status
                          </button>
                        </div>
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
