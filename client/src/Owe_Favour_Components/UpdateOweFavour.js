import React, { useEffect, useState } from "react";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { toast } from "react-toastify";
import '../Styling/bootstrap.css';
import ManageFavour from "../ManageFavour";

// update favour
// update favour title, description and rewards 

const UpdateOweFavour = ({ favour, ...props }) => {
  /*
  * Set variables used for collecting user data
  */
  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  const [recieveUser, setRecieveUser] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [id, setID] = useState("");
  const [currTitle, setTitle] = useState("");
  const [currDescription, setDescription] = useState("");
  const [currReward, setReward] = useState("");

  /*
  * Set changable variables to null
  */
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    reward: "",
  });

  const { title, description, reward } = inputs;

  /*
  * Responds to change by user input in form
  */
  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  /*
  * get owe favours from database
  */
  const getOweFavour = async () => {
    try {
      const { id } = props.match.params;
      console.log('fetch', id);
      const res = await fetch("http://localhost:5000/owe/getowefavourid/" + [id], {
        method: "GET",
        headers: { jwtToken: localStorage.jwtToken },
      });
      const parseData = await res.json();
      // set all data collected from specific id
      setID(parseData.favour_id);
      setTitle(parseData.title);
      setType(parseData.favour_type);
      setUser(parseData.user_name);
      setDescription(parseData.favour_description);
      setReward(parseData.rewards);
      setRecieveUser(parseData.recieving_username);
      setImage(parseData.favour_image);
      setDate(parseData.favour_date);     
    } catch (error) {
      console.error(error.message);
    }
  };

  /*
  * Update user input from form into database
  */
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { title, description, reward };
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

  /*
  * Calls getOweFavour()
  */
  useEffect(() => {
    getOweFavour();
  }, []);

  /*
  * HTML layout for the page
  */
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