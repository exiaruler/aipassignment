import React from 'react';

function ChangeUserDetail(){
    return (
        <div class="container">
        <div class="inner">
            <h1>Logo</h1>
            <div class="content">
                <h1>Change details</h1>
                <p>Please fill in to change details.</p>

                
                <div class="fullName">
                    <label>Full name</label>
                    <input type="text" name="fullName" id = "fullName" placeholder="Full name"/>
                </div>
                <div class="email">
                    <label>Email      </label>
                    <input type="text" name="email" id = "email" placeholder="Email"/>
                </div>
                
                <div class="userName">
                    <label>User name</label>
                    <input type="text" name="userName" id = "userName" placeholder="Username"/>
                </div>
                <div class="New password">
                    <label>New Password</label>
                    <input type="text" name="password" id = "password" placeholder="Password"/>
                </div>
                <div class="Old password">
                    <label>Old Password</label>
                    <input type="text" name="password" id = "password" placeholder="Password"/>
                </div>
                <label></label>
                <button>Save changes</button>
                <div class="cancel">
                    <label> </label>
                    <button>Cancel</button>
                </div>
            </div>
                
        </div>

    </div>
    )
}
export default ChangeUserDetail; 