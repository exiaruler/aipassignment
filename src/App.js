import React from 'react';
import './jumbotron-narrow.css'
import './bootstrap.css'
import SelectForm from './SelectForm';
import SignUp from './SignUp';
import Login from './Login';
import EditAccount from './ChangeUserDetails';
import ViewRequestFavours from './ViewRequestFavours';
import ManageFavours from './ManageFavour';
import FavourHistory from './FavourHistory';
import Leaderboard from './Leaderboard';
import ManageAccount from './ManageAccount';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
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
                              <ul class="nav nav-pills">
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
                                  
                                <Route exact path="/" render={() => { return (
                                          <Redirect to="/viewrequestfavours" /> 
                                        )
                                    }} />
                                <Route exact path="/viewrequestfavours" component={ViewRequestFavours} />
                                <Route path="/managefavours" component={ManageFavours} />
                                <Route path="/editaccount" component={EditAccount} />
                                <Route path="/favourhistory" component={FavourHistory} />
                                <Route path="/createfavour" component={SelectForm} />
                                <Route path="/login" component={Login} />
                                <Route path="/signup" component={SignUp} />
                                <Route path="/leaderboard" component={Leaderboard} />
                                <Route path="/manageaccount" component={ManageAccount} />
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
}

export default App;