import React from 'react';
import './jumbotron-narrow.css';
import './bootstrap.css';
import EditAccount from './ChangeUserDetails';
import ManageFavours from './ManageFavour';
import FavourHistory from './FavourHistory';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class ManageAccount extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <html lang="en">
          <h1>Manage your account</h1>
            <body>
                <div class="list-group">
                    <a href="#" class="list-group-item list-group-item-action">
                        <Link to="/favourhistory">Favour History</Link>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                    <Link to="/managefavours">Manage Favours</Link>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                    <Link to="/editaccount">Edit Account Details</Link>
                    </a>
                    
                </div>
                <Route path="/managefavours" component={ManageFavours} />
                <Route path="/editaccount" component={EditAccount} />
                <Route path="/favourhistory" component={FavourHistory} />
            </body>
        </html>
        );
    }
}

export default ManageAccount;