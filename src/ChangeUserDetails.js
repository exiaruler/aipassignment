import React, { useState } from "react";
import ViewRequestFavours from "./ViewRequestFavours";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";

const ChangeUserDetail = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const { fullName, email, oldPassword, newPassword } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { fullName, email, oldPassword, newPassword };
      const response = await fetch("http://localhost:5000/auth/editaccount", {
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
            <div class="content">
              <h1>Change details</h1>
              <p>Please fill in to change details.</p>

              <form onSubmit={onSubmitForm}>
                <div class="fullName">
                  <label>Full name</label>
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
                  <label>Email </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div class="New password">
                  <label>New Password</label>
                  <input
                    type="newPassword"
                    name="newPassword"
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div class="Old password">
                  <label>Old Password</label>
                  <input
                    type="text"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <label></label>
                <button>Save changes</button>
              </form>
              <div class="cancel">
                <label> </label>
                <Link to="/viewrequestfavours">
                  <button>Cancel</button>
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
