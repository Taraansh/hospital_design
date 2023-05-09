import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function TestList() {
  const [testList, setTestList] = useState([]);
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleTestList = async () => {
    const url = `http://127.0.0.1:8000/testlab/tests/`;

    const response = await fetch(url);
    const data = await response.json();
    setTestList(data);
  };

  useEffect(() => {
    handleTestList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        <h2 className="text-center">All Medicines</h2>
        {testList.map((element, index) => {
          const handleDeleteClick = async (testId) => {
            const confirmDelete = window.confirm(
              "Are you sure you want to delete this Test?"
            );
            if (confirmDelete) {
              try {
                // Delete the specific order by making an API call
                const response = await fetch(
                  `http://127.0.0.1:8000/pharmacy/detail/${testId}/`,
                  {
                    method: "DELETE",
                  }
                );
                if (response.ok) {
                  // Order successfully deleted, perform any necessary actions (e.g., refresh the order list)
                  handleTestList(); // Refresh the order list after deletion
                } else {
                  // Handle the case when the delete request fails
                  console.log("Failed to delete Test:", testId);
                }
              } catch (error) {
                // Handle any errors that occur during the delete operation
                console.error("Error deleting Test:", error);
              }
            }
          };

          const handleModifyClick = async (testId) => {
            const data = {
              price: price,
            };
            fetch(`http://127.0.0.1:8000/pharmacy/detail/${testId}/`, {
              method: "PUT",
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
            <div className="card list-group my-2" key={element.id}>
              <div>
                <div
                  className="list-group-item-action py-2 px-3"
                  style={{ textDecoration: "none", color: "currentcolor" }}
                  aria-current="true"
                >
                  <p className="mb-0 py-2">Test Id - {element.id}</p>
                  <p className="mb-0 py-2">Test Name - {element.name}</p>
                  <p className="mb-0 py-2">
                    Description - {element.description}
                  </p>

                  {/* <p className="mb-0 py-2">Price - ${element.price}</p> */}
                  <div className="mb-3">
                    <label htmlFor="puantity" className="form-label">
                      Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="puantity"
                      name="puantity"
                      aria-describedby="PriceHelp"
                      defaultValue={element.price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      style={{ width: "18rem" }}
                    />
                    <button
                      className="btn btn-dark float-end mb-2"
                      onClick={() => handleDeleteClick(element.medicine_id)}
                    >
                      Delete Test
                    </button>
                    <button
                      className="btn btn-dark float-end mb-2 mx-2"
                      onClick={() => handleModifyClick(element.medicine_id)}
                    >
                      Modify Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
