import React, { useState } from "react";
import "./bootstrap.css";
import "./jumbotron-narrow.css";


const OweRequest = () => {
    const [inputs, setInputs] = useState({
      title: "",
      recieveusername: "",
      description: "",
      reward: "",
      image:"",
    });
  
    const { title, recieveusername, description, reward,image } = inputs;
  
    const onChange = (e) =>
      setInputs({ ...inputs, [e.target.name]: e.target.value });
  
      const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
          const body = { title, recieveusername, description, reward,image};
          const response = await fetch("http://localhost:5000/addOweFavour", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });
        } catch (err) {
          console.error(err.message);
        }
      };

  
      return (
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
    
          <body>
          <div>
               <h2>Favour Owe Request</h2>
          </div>
          <div>
<form onSubmit={onSubmitForm}>
    <p>
<label>Favour title</label>
<input type="text">

    </input>
</p>
<p>
<label>Friend Username</label>
<input type="text">
 
</input>
</p>
<p>
<label>Description</label>
<input type="text">
 
</input>
</p>
<p>
<label>Reward</label>
<input type="text">

</input>
</p>
<p>
    <label>Image</label>
    <input type="file" 
    accept="image">
    
    </input>
</p>
<input type="submit"></input>

</form>

</div>
          </body>
        </html>
      );
    };


export default OweRequest;