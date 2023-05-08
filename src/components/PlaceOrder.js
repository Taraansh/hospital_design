import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder(props) {
  const [medicinelist, setMedicinelist] = useState([]);
  const [medicineName, setMedicineName] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [contact, setContact] = useState([]);
  const [price, setPrice] = useState([]);
  const navigate = useNavigate();

  const fetchMedicineList = async () => {
    const url = `http://127.0.0.1:8000/pharmacy/list/`;
    const data = await fetch(url);
    const parsedData = await data.json();

    setMedicinelist(parsedData);
  };

  useEffect(() => {
    fetchMedicineList();
    //eslint-disable-next-line
  }, []);

  const handleOrderClick = () => {
    navigate("/Orders");
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    const data = {
      medicine_name: medicineName,
      quantity: quantity,
      delivery_address: deliveryAddress,
      contact: contact,
      total_price: price,
    };

    fetch(
      `http://127.0.0.1:8000/orders/order/${localStorage.getItem(
        "patient_email"
      )}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        navigate("/Orders");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleQuantityChange = (event) => {
    const selectedMedicine = medicinelist.find(
      (element) => element.medicine_name === medicineName
    );
    const totalPrice = selectedMedicine.price * event.target.value;
    setQuantity(event.target.value);
    setPrice(totalPrice);
  };

  return (
    <>
      <NavBar />
      <div>
        <div className="container">
          <form onSubmit={handlePlaceOrder}>
            <h4 className="text-center">Place Order</h4>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="medicine_name" className="form-label">
                  Choose Medicine
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="medicine_name"
                  defaultValue="Choose a Medicine"
                  onChange={(e) => setMedicineName(e.target.value)}
                >
                  <option value="ChooseMedicine">Choose Medicine</option>
                  {medicinelist.map((element, index) => {
                    if (element.available) {
                      return (
                        <option key={index} value={element.medicine_name}>
                          {element.medicine_name} - {element.description} - $
                          {element.price}
                        </option>
                      );
                    } else {
                      return null;
                    }
                  })}
                </select>
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  aria-describedby="QuantityHelp"
                  onChange={handleQuantityChange}
                />
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="total_price" className="form-label">
                  Total Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="total_price"
                  name="total_price"
                  aria-describedby="PriceHelp"
                  value={price}
                  readOnly
                />
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="delivery_address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="delivery_address"
                  aria-describedby="addressHelp"
                  name="delivery_address"
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="container">
              <div className="mb-3">
                <label htmlFor="ContactNumber" className="form-label">
                  Contact No.
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="ContactNumber"
                  name="contact"
                  aria-describedby="ContactHelp"
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-dark mx-1">
              Place order
            </button>
            <button className="btn btn-dark mx-1" onClick={handleOrderClick}>
              Cancel order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
