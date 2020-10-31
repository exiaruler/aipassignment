/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/client/src/components/Register.js
 *
 ***************************************************************************************************************/

import React, { useState } from "react";
import "../Styling/bootstrap.css";
import "../Styling/jumbotron-narrow.css";
import { toast } from "react-toastify";
import { BrowserRouter as Route, Link } from "react-router-dom";
import Login from "./Login";

const SignUp = ({ setAuth }) => {
  // ------------------------------------------------
  // Set up variables for user input
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    userName: "",
  });
  const { fullName, email, password, userName } = inputs;

  // ------------------------------------------------
  // Allow for user to change text in the form below
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  // ------------------------------------------------
  // Handle 'Sign up' button
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const onSubmitForm = async (e) => {
    e.preventDefault(); // Stop refreshing the web page after clicking the button
    try {
      // Send to sever all of user's input
      const body = { fullName, email, password, userName };
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json(); // Recieve back JWT token in header

      if (parseRes.jwtToken) {
        // Set JWT token if there is a JWT token in header
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully!");
      } else {
        // Display error if 'signup' has an error
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  // ------------------------------------------------
  // Display Sign up form and button to Login
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div class="container">
          <div class="inner">
            <div class="left">
              <div class="content">
                <h1>Sign up</h1>
                <p>Please fill in details to create account.</p>
                <form onSubmit={onSubmitForm}>
                  <div class="fullName">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      placeholder="Full name"
                      value={fullName}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="email">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="password">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div class="userName">
                    <input
                      type="text"
                      name="userName"
                      id="userName"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => onChange(e)}
                    />
                  </div>

                  <button>Sign up</button>
                </form>
              </div>
            </div>
            <div class="right">
              <h1>Login</h1>

              <p>Already have an account? Press the button below to login.</p>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
            <Route path="/login" component={Login} />
          </div>
        </div>
      </body>
    </html>
  );
};

export default SignUp;
