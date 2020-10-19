import React, { useEffect, useState } from "react";
import ViewRequestFavours from "./ViewRequestFavours";
import "./bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login";
import { toast } from "react-toastify";

const ChangeUserDetail = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userName, setUserName] = useState("");

  const getProfile = async () => {
    // get user information from database
    try {
      const res = await fetch("http://localhost:5000/auth/editaccount2", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });

      const parseData = await res.json();
      setName(parseData.user_fullname);
      setEmail(parseData.user_email);
      setUserName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

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
          jwtToken: localStorage.jwtToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        setAuth(true);
        toast.success("Edit Successfully!");
      } else {
        //setAuth(false); not needed
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
    <br></br>
    <br></br>
    <h1>Account information:</h1>
      <body>
        <div class="container">
          <div class="inner">
            <div class="content">

              <p>UserName: {userName}</p>
              <p>Name: {name}</p>
              <p>Email: {userEmail}</p>
            <div>
              <h2>Change details</h2>   
            </div>   
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
