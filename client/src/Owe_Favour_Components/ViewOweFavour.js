import React, { useEffect, useState } from "react";
import "../Styling/bootstrap.css";
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";

const ViewOweFavour = ({ setAuth, ...props }) => {
  //set for text 
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [user, setUser] = useState("");
  const [description, setDescription] = useState("");
  const [reward, setReward] = useState("");
  const [recieveUser, setRecieveUser] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [completeimage, setCompleteImage] = useState("");

  /*
  Get favour 
 */
  const getFavour = async (e) => {
    //e.preventDefault();
    try {
      // get favour by id from url paramater 
      const { id } = props.match.params;
      console.log('fetch', id);
      const res = await fetch(
        "http://localhost:5000/owe/getowefavourid/" + [id],
        {
          method: "GET",
        }
      );
      
      // set json data
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
      setCompleteImage(parseData.complete_image);
    } catch (err) {
      console.error(err.message);
    }
  };


  //set details 
  useEffect(() => {
    getFavour();
  }, []);

  // web page
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <h1>{title}</h1>

        <div >
          <p>From:{user}</p>
          <p>Date:{date}</p>
          <p>Favour type:{type}</p>
          <p>Description:{description}</p>
          <p>Reward:{reward}</p>
          <p>Recieving User:{recieveUser}</p>

          <img src={image} alt="favour image" />
          <img src={completeimage} alt="proof" />
        </div>

        <button>
          <Link to="/managefavours">Back</Link>
        </button>
      </body>
    </html>
  );

};
export default ViewOweFavour;