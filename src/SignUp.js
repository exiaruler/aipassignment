import React, { useState } from "react";
import "./bootstrap.css";
import "./jumbotron-narrow.css";

import { BrowserRouter as Route, Link } from "react-router-dom";
import Login from "./Login";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    password: "",
    userName: "",
  });

  const { fullName, email, password, userName } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { fullName, email, password, userName };
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
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
              <h1>Logo</h1>

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
                      type="text"
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
