import React, { useState } from "react";
import "./bootstrap.css";
import "./jumbotron-narrow.css";


const OweRequest = () => {
  const [inputs, setInputs] = useState({
    title: "",
    recievinguser: "",
    description: "",
    reward: "",
    image:"",
    
  });
 
  
    const { title, recievinguser, description, reward,image } = inputs;
  
  
    const onChange = (e) =>
      setInputs({ ...inputs,[e.target.name]: e.target.files ? e.target.files[0]:e.target.value
      });


      const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
          const body = { title,recievinguser, description, reward,image};
          const formData = new FormData()
          formData.append('title', title);
          formData.append('recievinguser',recievinguser);
          formData.append('description',description);
          formData.append('reward',reward);
          formData.append('image',image);
          const response = await fetch("http://localhost:5000/owe/addowefavour", {
            method: "POST",
            headers: {
              jwtToken: localStorage.jwtToken,
            },
            body:formData,
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

<form onSubmit={onSubmitForm} enctype="multipart/form-data"  method="post" >
    <p>
<label>Favour title</label>
<input 
id="title"
name="title"
type="text"
value={title}
onChange={(e) => onChange(e)}

/>
</p>
<p>
<label>Friend Username</label>
<input
id="recievinguser"
name="recievinguser"
 type="text"
 value={recievinguser}
 onChange={(e) => onChange(e)}
/>
</p>
<p>
<label>Description</label>
<input type="text"
value={description}
id="description"
name="description"
 onChange={(e) => onChange(e)}
/>
</p>
<p>
<label>Reward</label>
<input type="text"
id="reward"
name="reward"
 onChange={(e) => onChange(e)}
 value={reward}
/>
</p>
<p>
    <label>Image</label>
    <input type="file" 
    accept="image/*"
    id="image"
    name="image"
    onChange={(e) => onChange(e)}
   
    />
</p>
<input type="submit" name="Submit"/>

</form>

</div> 
</body>
    </html>
      );
    };


export default OweRequest;