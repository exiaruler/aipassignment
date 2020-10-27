import React, { useEffect, useState } from "react";
 import { BrowserRouter as Route, Link } from "react-router-dom";
 import { toast } from "react-toastify";
 //import { json } from "sequelize/types";
 //import {Modal} from 'react-bootstrap';
 import './App.css';
 import './bootstrap.css';
 import ManageFavour from "./ManageFavour";

 const UpdateFavourRequest = ({ favour, ...props }) => {
     const [currTitle, setTitle] = useState("");
     const [currDescription, setDescription] = useState("");
     const [currReward, setReward] = useState("");
     const [date, setDate] = useState("");
     const [id, setID] = useState("");

     const [inputs, setInputs] = useState({
       title: "",
       favour_description: "",
       rewards: "",
     });

     const { title, favour_description, rewards } = inputs;

     const onChange = (e) =>
         setInputs({ ...inputs, [e.target.name]: e.target.value });

     const getFavourRequest = async () => {
         try {
           const { id } = props.match.params;
           console.log('fetch', id);
           const res = await fetch("http://localhost:5000/request/getFavourRequest/" + [id], {
             method: "GET",
             headers: { jwtToken: localStorage.jwtToken },
           });
           const parseData = await res.json();
           setTitle(parseData.title);
           setDescription(parseData.favour_description);
           setReward(parseData.rewards);
           setID(parseData.favour_id);
           setDate(parseData.favourrequest_date);    
         } catch (error) {
           console.error(error.message);
         }
       };

       const onSubmitForm = async (e) => {
         // update
         e.preventDefault();
         try {
           const body = { title, favour_description, rewards };
           const response = await fetch(
             "http://localhost:5000/request/updateFavourRequest/" + [id],
             {
               method: "PUT",
               headers: {
                 jwtToken: localStorage.jwtToken,
                 "Content-type": "application/json",
               },
               body: JSON.stringify(body),
             });
           console.log('Returned + '[id]);
           const parseRes = await response.json();
           toast.success("Updated Successfully!");
         } catch (err) {
           console.error(err.message);
         }
       };

       useEffect(() => {
         getFavourRequest();
       }, []);

       return (

         <html lang="en">
           <head>
             <meta name="viewport" content="width=device-width, initial-scale=1" />
           </head>
           <body>
             <h1>Edit Favour Request</h1>
             <h4>Current Favour Request Details:</h4>
             <div>
               <p><label>Title:</label> {currTitle}</p>
               <p><label>Description:</label> {currDescription}</p>
               <p><label>Rewards:</label> {currReward}</p>
               <p><label>Date:</label> {date}</p>
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
                   name="favour_description"
                   id="newDescription"
                   placeholder="New Description"
                   value={favour_description}
                   onChange={(e) => onChange(e)}
                 /></div>

               <div class="rewards">
                 <label>Rewards: </label>
                 <input
                   type="text"
                   name="rewards"
                   id="newReward"
                   placeholder="New Reward"
                   value={rewards}
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

     export default UpdateFavourRequest;

