import React, { useState, useEffect } from "react";
import "./jumbotron-narrow.css";
import "./bootstrap.css";
import SelectForm from "./SelectForm";
import SignUp from "./SignUp";
import Login from "./Login";
import EditAccount from "./ChangeUserDetails";
import ViewRequestFavours from "./ViewRequestFavours";
import ManageFavours from "./ManageFavour";
import FavourHistory from "./FavourHistory";
import Leaderboard from "./Leaderboard";
import ManageAccount from "./ManageAccount";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [istrue, setIstrue] = useState(true);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  const setTrue = (boolean) => {
    setIstrue(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    try {
      //window.location.reload();
      localStorage.removeItem("jwtToken");
      setAuth(false);
      document.getElementById("edit").children[2].style.display = "block";
      document.getElementById("edit").children[1].style.display = "block";
      document.getElementById("edit").children[6].style.display = "none";
      document.getElementById("edit").children[5].style.display = "none";
      document.getElementById("edit").children[4].style.display = "none";
      document.getElementById("edit").children[3].style.display = "none";
    } catch (err) {
      console.error(err.message);
    }
  };

  function handleClick() {
    //window.location.reload();\
    if (isAuthenticated) {
      document.getElementById("edit").children[2].style.display = "none";
      document.getElementById("edit").children[1].style.display = "none";
      document.getElementById("edit").children[6].style.display = "block";
      document.getElementById("edit").children[5].style.display = "block";
      document.getElementById("edit").children[4].style.display = "block";
      document.getElementById("edit").children[3].style.display = "block";
    }

    if (!isAuthenticated) {
      document.getElementById("edit").children[2].style.display = "block";
      document.getElementById("edit").children[1].style.display = "block";
      document.getElementById("edit").children[6].style.display = "none";
    }
  } //onClick={handleClick} {...onlyShow()}
  useEffect(() => {
    checkAuthenticated();
  }, []);
  window.onload = function () {
    // loading the screen
    if (isAuthenticated) {
      setAuth(true);
    }
    if (isAuthenticated) {
      document.getElementById("edit").children[6].style.display = "block";
      document.getElementById("edit").children[5].style.display = "none";
      document.getElementById("edit").children[4].style.display = "none";
      document.getElementById("edit").children[3].style.display = "none";
      //document.getElementById("edit").children[2].style.display = "none";
      //document.getElementById("edit").children[1].style.display = "block";
    } else {
      document.getElementById("edit").children[6].style.display = "none";
      document.getElementById("edit").children[5].style.display = "none";
      document.getElementById("edit").children[4].style.display = "none";
      document.getElementById("edit").children[3].style.display = "none";
    }
  };

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
                      path="/editaccount"
                      render={(props) =>
                        isAuthenticated ? (
                          <EditAccount {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      } //component={EditAccount}
                    />
                    <Route
                      path="/favourhistory"
                      component={FavourHistory} // cant make this logout into login
                    />
                    <Route
                      path="/createfavour"
                      render={(props) =>
                        isAuthenticated ? (
                          <SelectForm {...props} setAuth={setAuth} />
                        ) : (
                          <Redirect to="/login" />
                        )
                      } //component={SelectForm} />
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
                      component={Leaderboard} // cant make this logout into login
                    />
                    <Route
                      path="/manageaccount"
                      component={ManageAccount} // cant make this logout into login
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
