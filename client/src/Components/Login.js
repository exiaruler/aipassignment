/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/client/src/components/Login.js
 *
 ***************************************************************************************************************/

import React, { useState } from "react";
import SignUp from "./SignUp";
import { toast } from "react-toastify";
import { BrowserRouter as Route, Link } from "react-router-dom";

const Login = ({ setAuth }) => {
  // ------------------------------------------------
  // Set up variables for user input
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });
  const { userName, password } = inputs;

  // ------------------------------------------------
  // Allow for user to change text in the form below
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  // ------------------------------------------------
  // Handle 'Login' button
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const onSubmitForm = async (e) => {
    e.preventDefault(); // Stop refreshing the web page after clicking the button
    try {
      // Send to sever all of user's input
      const body = { userName, password };
      const response = await fetch("http://localhost:5000/auth/login", {
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
        toast.success("Logged in Successfully!");
      } else {
        // Display error if 'login' has an error
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  // ------------------------------------------------
  // Display Login form and button to Sign up
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
                <h1>Login</h1>
                <p>Please fill in details to login.</p>
                <form onSubmit={onSubmitForm}>
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

                  <button>Login</button>
                </form>
              </div>
            </div>

            <div class="right">
              <h1>Sign up</h1>

              <p>Don't have an account? Press the button below to sign up.</p>
              <Link to="/signup">
                <button type="button">Sign up</button>
              </Link>
            </div>

            <Route path="/signup" component={SignUp} />
          </div>
        </div>
      </body>
    </html>
  );
};

export default Login;
