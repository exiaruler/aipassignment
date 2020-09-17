import React from 'react';
import SignUp from './SignUp';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";



class Login extends React.Component {
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
                                            <h1>Login</h1>
                                            <p>Please fill in details to login.</p>

                                            <div class="userName"><input type="text" name="userName" id="userName" placeholder="Username" />
                                            </div>
                                            <div class="password"><input type="text" name="password" id="password" placeholder="Password" />
                                            </div>

                                            <button>Login</button>

                                        </div>
                                    </div>

                                    <div class="right">
                                        <h1>Login</h1>

                                        <p>Don't have an account? Press the button below to sign up.</p>
                                        <Link to="/signup">
                                            <button type="button">Sign up</button>
                                        </Link>
                                    </div>
                                    
                                    <Route path="/signup" component={SignUp} />

                                </div>
                            </div >

                        
                    </form>
                </body>
            </html >
        );

    }
}
export default Login;