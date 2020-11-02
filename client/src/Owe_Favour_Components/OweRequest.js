/***************************************************************************************************************
 *    Title: pern-todo-app
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-todo-app/blob/master/client/src/components/InputTodo.js
 *
 ***************************************************************************************************************/

/***************************************************************************************************************
 *    Feature: multer insert image
 *    Tutor/assistant: Le Kang 
 *    Date: 2020
 ***************************************************************************************************************/

import React, { useState } from "react";
import "../Styling/bootstrap.css";
import "../Styling/jumbotron-narrow.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { toast } from "react-toastify";
// init fields 
const OweRequest = () => {
  const [inputs, setInputs] = useState({
    title: "",
    recievinguser: "",
    favourtype: "",
    description: "",
    reward: "",
    image: "",

  });

  // field input
  const { title, recievinguser, favourtype, description, reward, image } = inputs;

  const onChange = (e) =>
    setInputs({
      ...inputs, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value
    });
    /*
    form submission of adding owe favour
    */
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { title, recievinguser, favourtype, description, reward, image };
      // field data insert 
      const formData = new FormData()
      formData.append('title', title);
      formData.append('recievinguser', recievinguser);
      formData.append('favourtype', favourtype);
      console.log("Submit"+favourtype);
      formData.append('description', description);
      formData.append('reward', reward);
      formData.append('image', image);
      const response = await fetch("http://localhost:5000/owe/addowefavour", {
        method: "POST",
        headers: {
          // get jwt token from local storage 
          jwtToken: localStorage.jwtToken,
        },
        body: formData,
      });
      // notefication when for page when favour added
        toast.success("favour added")
        // redirect back to home
        window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

 



    //web page
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

          <form onSubmit={onSubmitForm} enctype="multipart/form-data" method="POST"  >
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Favour Title</span>
                </div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => onChange(e)}
                  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                ></input>
           
            <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Friend Username</span>
                </div>
                <input
                  id="recievinguser"
                  name="recievinguser"
                  type="text"
                  value={recievinguser}
                  onChange={(e) => onChange(e)}
                  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                ></input>
            
            <p>
              <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Select Favour</span>
              </div>
              <select name="favourtype" id="favourtype" value={favourtype.value} onChange={(e) => onChange(e)} >
                <option>Select Options</option>
                <option name="favourtype" id="favourtype" value="Owe a drink" onChange={(e) => onChange(e)} >Owe a drink</option>
                <option name="favourtype" id="favourtype" value="Owe lunch" onChange={(e) => onChange(e)}>Owe lunch</option>
                <option name="favourtype" id="favourtype" value="Owe dinner" onChange={(e) => onChange(e)}>Owe dinner</option>
                <option name="favourtype" id="favourtype" value="Owe snack" onChange={(e) => onChange(e)}>Owe snack</option>
                <option name="favourtype" id="favourtype" value="custom" onChange={(e) => onChange(e)}>Custom</option>
              </select>
            </p>


            <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Description</span>
                </div>
                <input
                  type="text"
                  value={description}
                  id="description"
                  name="description"
                  onChange={(e) => onChange(e)}
                  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                ></input>


            <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Reward</span>
                </div>
                <input
                  type="text"
                  id="reward"
                  name="reward"
                  onChange={(e) => onChange(e)}
                  value={reward}
                  onChange={(e) => onChange(e)}
                  class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                ></input>

            <p>
              <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-default">Image</span>
                </div>
              <input type="file"
                accept="image/*"
                id="image"
                name="image"
                onChange={(e) => onChange(e)}

              />
            </p>
            <input type="submit" name="Submit"  class="btn btn-success"/>
           </div>
          </form>

        </div>
      </body>
    </html>
  );
};


export default OweRequest;