
import React, { useEffect, useState } from "react";
import "./bootstrap.css";

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



  


  const getFavour = async (e) => {
    //e.preventDefault();
    try {
      const { id } = props.match.params;
      console.log('fetch', id);
      const res = await fetch(
        "http://localhost:5000/owe/getowefavourid/" + [id],
        {
          method: "GET",
        }
      );
      //const jsonData = await response.json();
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
    } catch (err) {
      console.error(err.message);
    }
  };



  useEffect(() => {
    getFavour();
  }, []);


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

          <img />
        </div>

      </body>
    </html>
  );

};
export default ViewOweFavour;