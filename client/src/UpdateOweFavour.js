import React, { useEffect, useState } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { toast } from "react-toastify";
//import { json } from "sequelize/types";
//import {Modal} from 'react-bootstrap';
import './App.css';
import './bootstrap.css';
import ManageFavour from "./ManageFavour";

// update favour
// favour title, description, rewards

const UpdateOweFavour = ({ favour, ...props }) => {
  const [currTitle, setTitle] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  const [currDescription, setDescription] = useState("");
  const [currReward, setReward] = useState("");
  const [recieveUser, setRecieveUser] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [id, setID] = useState("");

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    reward: "",
  });

  const { title, description, reward } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  // method: "GET"
  // get owe favours from favour_id through local storage
  const getOweFavour = async () => {
    try {
      const { id } = props.match.params;
      console.log('fetch', id);
      const res = await fetch("http://localhost:5000/owe/getowefavourid/" + [id], {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken },
      });
      const parseData = await res.json();
      setID(parseData.favour_id);
      setTitle(parseData.title);
      setType(parseData.favour_type);
      setUser(parseData.user_name);
      setDescription(parseData.favour_description);
      setReward(parseData.rewards);
      setRecieveUser(parseData.recieving_username);
      setImage(parseData.favour_image);
      setDate(parseData.favour_date);
      //console.log(setID);      
    } catch (error) {
      console.error(error.message);
    }
  };

  // PUT --> update data into database
  const onSubmitForm = async (e) => {
    // update
    e.preventDefault();
    try {
      const body = { title, description, reward };
      //console.log(body);
      const response = await fetch(
        "http://localhost:5000/owe/updateowefavour/" + [id],
        {
          method: "PUT",
          headers: {
            jwtToken: localStorage.jwtToken,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        });
      const parseRes = await response.json();
      toast.success("Update Successfully!");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getOweFavour();
  }, []);

  return (

    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <h1>Edit Owe Favour</h1>
        <h4>Current Details About Favour:</h4>
        <div>
          <p><label>Title:</label> {currTitle}</p>
          <p><label>Description:</label> {currDescription}</p>
          <p><label>Rewards:</label> {currReward}</p>
          <p><label>Date:</label> {date}</p>
          <p><label>Favour type:</label> {type}</p>
          <p><label>Recieving User:</label> {recieveUser}</p>
        </div>

        <h4>Please fill in the following to change details:</h4>
        <form onSubmit={onSubmitForm}>
          <div class="title">
            <label>Title: </label>
            <input
              type="text"
              name="title"
              id="newTitle"
              placeholder="New Title"
              value={title}
              onChange={(e) => onChange(e)}
            /></div>

          <div class="description">
            <label>Description: </label>
            <input
              type="text"
              name="description"
              id="newDescription"
              placeholder="New Description"
              value={description}
              onChange={(e) => onChange(e)}
            /></div>

          <div class="reward">
            <label>Rewards: </label>
            <input
              type="text"
              name="reward"
              id="newReward"
              placeholder="New Reward"
              value={reward}
              onChange={(e) => onChange(e)}
            /></div>

          <button
            type="submit"
            class="btn btn-primary"
            id="editBtn"
          >
            Update
      </button>
        </form>
        <Link to="/managefavours">
          <button class="btn btn-primary"> Cancel </button>
        </Link>


        <Route path="/managefavour" component={ManageFavour} />
      </body>
    </html>

  );
};

export default UpdateOweFavour;