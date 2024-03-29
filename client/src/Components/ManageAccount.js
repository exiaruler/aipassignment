import React from "react";
import "../Styling/jumbotron-narrow.css";
import "../Styling/bootstrap.css";
import EditAccount from "./ChangeUserDetails";
import ManageFavours from "./ManageFavour";
import ExistingFavours from "../Owe_Favour_Components/ExistingFavours";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class ManageAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <html lang="en">
        <br></br>
        <br></br>
        <h1>Manage your account</h1>
        <body>
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action">
              <Link to="/managefavours">Manage Favours</Link>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <Link to="/editaccount">Edit Account Details</Link>
            </a>
            <a href="#" class="list-group-item list-group-item-action">
              <Link to="/existingfavours">View Existing Favours</Link>
            </a>
          </div>
          <Route path="/managefavours" component={ManageFavours} />
          <Route path="/editaccount" component={EditAccount} />
          <Route path="/existingfavours" component={ExistingFavours} />
        </body>
      </html>
    );
  }
}

export default ManageAccount;
