import React, { useState } from "react";
import SignUp from "./SignUp";
import { toast } from "react-toastify";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
  });

  const { userName, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { userName, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

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
                      type="text"
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
