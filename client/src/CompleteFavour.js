
import React, { useEffect, useState } from "react";
import "./bootstrap.css";
import { toast } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const CompleteFavour = ({ setAuth, ...props }) => {
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

  //input for image
  const [inputs, setInputs] = useState({
    completeImage: "",
  });

  const { completeImage } = inputs;

  const onChange = (e) =>
    setInputs({
      ...inputs, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value
    });

  console.log(completeImage);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { completeImage };
      const { id } = props.match.params;
      console.log(id);
      const formData = new FormData()
      formData.append('completeImage', completeImage);
      console.log(completeImage);
      const response = await fetch('http://localhost:5000/owe/completefavourowe/' + [id], {
        method: "PUT",
        headers: {
          jwtToken: localStorage.jwtToken,
        },
        body: formData,
      });
      toast.success("Favour Complete");
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };


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
        <h1>Complete Favour</h1>

        <div >
          <h2>Title:{title}</h2>
          <p>From:{user}</p>
          <p>Date:{date}</p>
          <p>Favour type:{type}</p>
          <p>Description:{description}</p>
          <p>Reward:{reward}</p>
          <p>Recieving User:{recieveUser}</p>

          <img />
        </div>


        <div>
          <h3>Insert image</h3>
          <form onSubmit={onSubmitForm} enctype="multipart/form-data">
            <input type="file"
              accept="completeImage/*"
              id="completeImage"
              name="completeImage"
              onChange={(e) => onChange(e)}
            />
            <input type="submit" name="submit" />
          </form>
          <button>Back
          <Link to="/existingfavours"></Link>
          </button>
        </div>
      </body>
    </html>
  );

};
export default CompleteFavour;