import React from 'react';

function Login(){
    return(
        <div class="container">
        <div class="inner">
            <div class="left">
                <h1>Logo</h1>
                
                <div class="content">
                    <h1>Login</h1>
                    <p>Please fill in details to login.</p>

                    <div class="userName"><input type="text" name="userName" id = "userName" placeholder="Username"/>
                    </div>
                    <div class="password"><input type="text" name="password" id = "password" placeholder="Password"/>
                    </div>

                    <button>Login</button>
                    
                </div>
            </div>
            <div class="right">
                <h1>Login</h1>

                <p>Don't have an account? Press the button below to sign up.</p>

                <button>Sign up</button>
                
            </div>

        </div>
    </div>
    )

}
export default Login;