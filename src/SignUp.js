import React from 'react';
import './bootstrap.css'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from './Login';



class SignUp extends React.Component {
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
                                <div class="left">
                                    <h1>Logo</h1>

                                    <div class="content">
                                        <h1>Sign up</h1>
                                        <p>Please fill in details to create account.</p>
                                        <form className="d-flex mt-5">

                                            <div class="fullName"><input type="text" name="fullName" id="fullName" placeholder="Full name" />
                                            </div>
                                            <div class="email"><input type="text" name="email" id="email" placeholder="Email" />
                                            </div>
                                            <div class="password"><input type="text" name="password" id="password" placeholder="Password" />
                                            </div>
                                            <div class="userName"><input type="text" name="userName" id="userName" placeholder="Username" />
                                            </div>

                                            <button>Sign up</button>
                                        </form>

                                    </div>
                                </div>
                                <div class="right">
                                    <h1>Login</h1>

                                    <p>Already have an account? Press the button below to login.</p>
                                    <Link to="/login">
                                    <button >lOgin</button>
                                    </Link>
                                </div>
                                <Route path="/login" component={Login} />

                            </div>
                        </div>
                    </form>
                </body>
            </html >

        );
    }
}

export default SignUp;
