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
  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
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
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      setAuth(false);
      document.getElementById("edit").children[2].style.display = "block";
      document.getElementById("edit").children[1].style.display = "block";
    } catch (err) {
      console.error(err.message);
    }
  };

  function handleClick() {
    if (isAuthenticated) {
      document.getElementById("edit").children[2].style.display = "none";
      document.getElementById("edit").children[1].style.display = "none";
    }

    if (!isAuthenticated) {
      document.getElementById("edit").children[2].style.display = "block";
      document.getElementById("edit").children[1].style.display = "block";
    }
  } //onClick={handleClick}

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
                    <Link to="/signup">Sign Up</Link>
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
                    <Route path="/managefavours" component={ManageFavours} />
                    <Route path="/editaccount" component={EditAccount} />
                    <Route path="/favourhistory" component={FavourHistory} />
                    <Route path="/createfavour" component={SelectForm} />
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
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route path="/manageaccount" component={ManageAccount} />
                  </Switch>
                </ul>
              </nav>
              <button onClick={(e) => logout(e)} className="btn btn-primary">
                Logout
              </button>
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
