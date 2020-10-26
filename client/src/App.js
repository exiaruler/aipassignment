/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/client/src/App.js
 *
 ***************************************************************************************************************/

import React, { useState, useEffect } from "react";
import "./jumbotron-narrow.css";
import "./bootstrap.css";
import SelectForm from "./SelectForm";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import EditAccount from "./Components/ChangeUserDetails";
import ViewRequestFavours from "./ViewRequestFavours";
import ManageFavours from "./ManageFavour";
import FavourHistory from "./FavourHistory";
import Leaderboard from "./Components/Leaderboard";
import ManageAccount from "./ManageAccount";
import CompleteFavour from "./CompleteFavour";
import UpdateOweFavour from "./UpdateOweFavour";
import ExistingFavours from "./ExistingFavours";
import ViewOweFavour from "./ViewOweFavour";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

toast.configure(); // Set up 'toast' for notifications

function App() {
  // ------------------------------------------------
  // Load this function when refreshing
  // ------------------------------------------------
  window.onload = loadMenu;
  // ---------------------------------------------------------------------
  // Execute 'loadMenu' to remove buttons that user is not authorised for
  // ---------------------------------------------------------------------
  function loadMenu() {
    // Works only with nav-links that have 'render' instead of 'component' below in return
    if (istrue) {
      // Do not show these buttons to unauthorise user
      document.getElementById("edit").children[6].style.display = "none";
      document.getElementById("edit").children[5].style.display = "none";
      document.getElementById("edit").children[4].style.display = "none";
      document.getElementById("edit").children[3].style.display = "none";
    }
  }
  // ------------------------------------------------
  // Set up variables for authentication
  // ------------------------------------------------
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Set user authentication
  const [istrue, setIstrue] = useState(true); // Set button authentication

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  const setTrue = (boolean) => {
    setIstrue(boolean);
  };
  // ------------------------------------------------
  // Handle useEffect to recieve JWT token
  // ------------------------------------------------
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });
      const parseRes = await res.json(); // Recieve back 'true'in header
      if (parseRes == true) {
        // Set 'true' if 'true' in header
        setAuth(true);
      } else {
        // Set 'false' if not 'true' in header
        setAuth(false);
      }
      setTrue(false); // Set 'false' if 'true' in header
    } catch (err) {
      console.error(err.message);
    }
  };
  // ------------------------------------------------
  // Handle 'logout' button
  // ------------------------------------------------
  const logout = async (e) => {
    try {
      localStorage.removeItem("jwtToken"); // Remove JWT token to unauthorise user
      setAuth(false); // Set 'false' to unauthorise user
      setTrue(true); // Set 'true' to unauthorise user
      document.getElementById("edit").children[2].style.display = "block"; // Show only unauthorise buttons
      document.getElementById("edit").children[1].style.display = "block";
      document.getElementById("edit").children[6].style.display = "none";
      document.getElementById("edit").children[5].style.display = "none";
      document.getElementById("edit").children[4].style.display = "none";
      document.getElementById("edit").children[3].style.display = "none";
      toast.success("Logout Successfully!"); // Display notification of user Logging out
    } catch (err) {
      console.error(err.message);
    }
  };
  // ---------------------------------------------------------------------------------------
  // Handle 'handleClick' to display buttons the user is authorised to see when signing in
  // ---------------------------------------------------------------------------------------
  function handleClick() {
    if (isAuthenticated) {
      document.getElementById("edit").children[2].style.display = "none"; // Show only authorise buttons
      document.getElementById("edit").children[1].style.display = "none";
      document.getElementById("edit").children[6].style.display = "block";
      document.getElementById("edit").children[5].style.display = "block";
      document.getElementById("edit").children[4].style.display = "block";
      document.getElementById("edit").children[3].style.display = "block";
    }
    if (!isAuthenticated) {
      document.getElementById("edit").children[2].style.display = "block";
      document.getElementById("edit").children[6].style.display = "none";
    }
  }
  // ------------------------------------------------
  // Execute 'checkAuthenticated' function
  // ------------------------------------------------
  useEffect(() => {
    checkAuthenticated();
  }, []);
  // ---------------------------------------------------
  // Display web page including header, footer and body
  // ---------------------------------------------------
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>Home</title>
      </head>

      <body>
        <Router>
          <div class="container">
            <div class="header clearfix">
              <nav>
                <ul class="nav nav-pills" id="edit">
                  <li>
                    <Link to="/viewrequestfavours">Home</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>

                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/createfavour">Create Favour</Link>
                  </li>
                  <li>
                    <Link to="/leaderboard">Leaderboard</Link>
                  </li>
                  <li>
                    <Link to="/manageaccount">Manage Account</Link>
                  </li>
                  <li>
                    <button
                      onClick={(e) => logout(e)}
                      className="btn btn-primary"
                    >
                      Logout
                    </button>
                  </li>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={() => {
                        return <Redirect to="/viewrequestfavours" />;
                      }}
                    />
                    <Route
                      exact
                      path="/viewrequestfavours"
                      component={ViewRequestFavours}
                    />
                    <Route
                      path="/managefavours"
                      render={(props) =>
                        isAuthenticated ? (
                          <ManageFavours {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                      //component={ManageFavours}
                    />
                    <Route
                      path="/updateowefavour/:id"
                      component={UpdateOweFavour}
                      render={(props) =>
                        isAuthenticated ? (
                          <UpdateOweFavour {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/completefavour/:id"
                      component={CompleteFavour}
                      render={(props) =>
                        isAuthenticated ? (
                          <CompleteFavour {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/viewowefavour/:id"
                      component={ViewOweFavour}
                      render={(props) =>
                        isAuthenticated ? (
                          <CompleteFavour {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/ExistingFavours"
                      component={ExistingFavours}
                      render={(props) =>
                        isAuthenticated ? (
                          <CompleteFavour {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/editaccount"
                      render={(props) =>
                        isAuthenticated ? (
                          <EditAccount {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/favourhistory"
                      component={FavourHistory} // Need to add user authentication in 'favourhistory'
                    />
                    <Route
                      path="/createfavour"
                      render={(props) =>
                        isAuthenticated ? (
                          <SelectForm {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/login"
                      render={(props) =>
                        !isAuthenticated ? (
                          <Login {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect
                            to="/viewrequestfavours"
                            {...handleClick()}
                            setTrue={false}
                          />
                        )
                      }
                    />
                    <Route
                      path="/signup"
                      render={(props) =>
                        !isAuthenticated ? (
                          <SignUp {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/leaderboard"
                      render={(props) =>
                        isAuthenticated ? (
                          <Leaderboard {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      }
                    />
                    <Route
                      path="/manageaccount"
                      component={ManageAccount} // Need to add user authentication in 'manageaccount'
                    />
                  </Switch>
                </ul>
              </nav>
            </div>
            <footer class="footer">
              <p>&copy; Adv Internet Programing</p>
            </footer>
          </div>
        </Router>
      </body>
    </html>
  );
}

export default App;
