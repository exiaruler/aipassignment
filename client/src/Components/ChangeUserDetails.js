/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/client/src/App.js
 *
 ***************************************************************************************************************/

import React, { useEffect, useState } from "react";
import ViewRequestFavours from "../ViewRequestFavours";
import "../bootstrap.css";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { toast } from "react-toastify";

const ChangeUserDetail = ({ setAuth }) => {
  // ------------------------------------------------
  // Set up variables to display user information
  // ------------------------------------------------
  const [name, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  // ------------------------------------------------
  // Handle useEffect to recieve user information
  // ------------------------------------------------
  const getProfile = async () => {
    // Send to sever JWT token with user 'id'
    try {
      const res = await fetch("http://localhost:5000/auth/editaccount2", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });
      const parseData = await res.json(); // Recieve back user information

      setName(parseData.user_fullname); // Assign user information to variable
      setEmail(parseData.user_email);
      setUserName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };
  // ------------------------------------------------
  // Set up variables for user input
  // ------------------------------------------------
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const { fullName, email, oldPassword, newPassword } = inputs;

  // ------------------------------------------------
  // Allow for user to change text in the form below
  // ------------------------------------------------
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  // ------------------------------------------------
  // Handle 'Save changes' button
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // Send to sever all of user's input and JWT token
      const body = { fullName, email, oldPassword, newPassword };
      const response = await fetch("http://localhost:5000/auth/editaccount", {
        method: "POST",
        headers: {
          jwtToken: localStorage.jwtToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json(); // Recieve back JWT token in header

      if (parseRes.jwtToken) {
        // Set JWT token if there is a JWT token in header
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        setAuth(true);
        toast.success("Edit Successfully!");
      } else {
        // Display error if 'editaccount' has an error
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  // ------------------------------------------------
  // Exceute 'getProfile' to get user information
  // ------------------------------------------------
  useEffect(() => {
    getProfile();
  }, []);
  // ------------------------------------------------------
  // Display Change user details form and button to cancel
  // ------------------------------------------------------
  return (
    <html lang="en">
      <br></br>
      <br></br>
      <h1>Account information:</h1>
      <body>
        <div class="container">
          <div class="inner">
            <div class="content">
              <p>Username: {userName}</p>
              <p>Name: {name}</p>
              <p>Email: {userEmail}</p>
              <div>
                <h2>Change details</h2>
              </div>
              <label>Please fill in to change details.</label>

              <form onSubmit={onSubmitForm}>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Full Name</span>
                </div>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => onChange(e)}
                  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                ></input>

                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                </div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                  />

                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">New Password</span>
                </div>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => onChange(e)}
                    class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                  />

                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Old Password</span>
                </div>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => onChange(e)}
                    class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                  />

                </div>
                <br></br>
                <button class="btn btn-success">Save changes</button>
              </form>
              <div class="cancel">
                <label> </label>
                <Link to="/viewrequestfavours">
                  <button class="btn btn-danger">Cancel</button>
                </Link>
              </div>
            </div>
            <Route path="/viewrequestfavours" component={ViewRequestFavours} />
          </div>
        </div>
      </body>
    </html>
  );
};

export default ChangeUserDetail;
