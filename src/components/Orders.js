import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function Orders(props) {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    const url = `https://hospital-management-p6cm.onrender.com/orders/myorder/${localStorage.getItem('patient_email')}/`;
    const data = await fetch(url);
    const parsedData = await data.json();

    setMedicines(parsedData);
  };

  useEffect(() => {
    fetchOrderDetails();
    //eslint-disable-next-line
  }, []);

  const handleOrderClick = () => {
    navigate("/PlaceOrder");
  };

  return (
    <>
      <NavBar />
      <div className="container">
        {medicines.map((element, index) => {
          const handleDeleteClick = async (orderId) => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this order?"
            );
            if (confirmDelete) {
              try {
                // Delete the specific order by making an API call
                const response = await fetch(
                  `https://hospital-management-p6cm.onrender.com/orders/order/${orderId}/delete/`,
                  {
                    method: "DELETE",
                  }
                );
                if (response.ok) {
                  // Order successfully deleted, perform any necessary actions (e.g., refresh the order list)
                  fetchOrderDetails(); // Refresh the order list after deletion
                } else {
                  // Handle the case when the delete request fails
                  console.log("Failed to delete order:", orderId);
                }
              } catch (error) {
                // Handle any errors that occur during the delete operation
                console.error("Error deleting order:", error);
              }
            }
          };

          return (
            <div className="card list-group my-2" key={element.order_id}>
              <div key={index}>
                <div
                  className="list-group-item-action py-2 px-3"
                  style={{ textDecoration: "none", color: "currentcolor" }}
                  aria-current="true"
                >
                  <p className="mb-0 py-2">Order Id - {element.order_id}</p>
                  <p className="mb-0 py-2">Patient - {element.patient_name}</p>
                  <p className="mb-0 py-2">
                    Medicine - {element.medicine_name}
                  </p>
                  <p className="mb-0 py-2">
                    Quantity - {element.quantity} Nos.
                  </p>
                  <p className="mb-0 py-2">
                    Address - {element.delivery_address}
                  </p>
                  <p className="mb-0 py-2">Contact - {element.contact}</p>
                  <p className="float-end mb-1">
                    Total - ${element.total_price}
                  </p>
                  <p className="mb-0 py-2">Status - {element.status}</p>
                  <button
                    className="btn btn-dark float-end mb-2"
                    onClick={() => handleDeleteClick(element.order_id)}
                  >
                    Delete Order
                  </button>
                  <p className="mb-0 py-2">
                    Date Ordered -{" "}
                    {new Date(element.date_created).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <button
          className="btn btn-dark float-end my-2"
          onClick={handleOrderClick}
        >
          Order Medicines
        </button>
      </div>
    </>
  );
}
