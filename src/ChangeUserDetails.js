import React from 'react';
import ViewRequestFavours from './ViewRequestFavours';
import './bootstrap.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from './Login';



class ChangeUserDetail extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <html lang="en">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />


                </head>

                <body>
                    <form className="d-flex mt-5">
                        <div class="container">
                            <div class="inner">

                                <div class="content">
                                    <h1>Change details</h1>
                                    <p>Please fill in to change details.</p>


                                    <div class="fullName">
                                        <label>Full name</label>
                                        <input type="text" name="fullName" id="fullName" placeholder="Full name" />
                                    </div>
                                    <div class="email">
                                        <label>Email      </label>
                                        <input type="text" name="email" id="email" placeholder="Email" />
                                    </div>

                                    <div class="userName">
                                        <label>User name</label>
                                        <input type="text" name="userName" id="userName" placeholder="Username" />
                                    </div>
                                    <div class="New password">
                                        <label>New Password</label>
                                        <input type="text" name="password" id="password" placeholder="Password" />
                                    </div>
                                    <div class="Old password">
                                        <label>Old Password</label>
                                        <input type="text" name="password" id="password" placeholder="Password" />
                                    </div>
                                    <label></label>
                                    <button>Save changes</button>
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
                    </form>
                </body>
            </html >
        );
    }
}
export default ChangeUserDetail; 