import React from 'react';



function SignUp() {
  return (

    <div class="container">
        <div class="inner">
            <div class="left">
                <h1>Logo</h1>
                
                <div class="content">
                    <h1>Sign up</h1>
                    <p>Please fill in details to create account.</p>

                    <div class="fullName"><input type="text" name="fullName" id = "fullName" placeholder="Full name"/>
                    </div>
                    <div class="email"><input type="text" name="email" id = "email" placeholder="Email"/>
                    </div>
                    <div class="password"><input type="text" name="password" id = "password" placeholder="Password"/>
                    </div>
                    <div class="userName"><input type="text" name="userName" id = "userName" placeholder="Username"/>
                    </div>

                    <button>Sign up</button>
                    
                </div>
            </div>
            <div class="right">
                <h1>Login</h1>

                <p>Already have an account? Press the button below to login.</p>

                <button >lOgin</button>
                
            </div>

        </div>
    </div>

  );
}

export default SignUp;
