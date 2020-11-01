import React, { useEffect, useState } from "react";
import UpdateOweFavour from "./UpdateOweFavour";
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";
const ExistingFavours = ({ setAuth }) => {
  //  init of to get favours
  const [getallowefavourowe, setAllOweFavour] = useState([]);

// diplay favours 
  const getAllFavours = async (e) => {
  
    try {
      const response = await fetch(
        "http://localhost:5000/owe/getallowedfavour",
        {
          method: "GET",
          headers: {
            jwtToken: localStorage.jwtToken,
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData.jwtToken) {
        localStorage.setItem("jwtToken", jsonData.jwtToken);
        setAuth(true);
      } else {
      
      }
      setAllOweFavour(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  //  set favours into page 
  useEffect(() => {
    getAllFavours();
  }, []);
  // web page
  return (
    <html lang="en">
      <br></br>
      <br></br>
      <div>
        <h1>Existing Owed Favours</h1>
      </div>

      <body>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>From</th>
              <th>Favour Title</th>
              <th>Favour Type</th>
              <th>Favour Description</th>
              <th>Reward</th>
              <th>Favour To Who</th>
              <th>Image</th>
              <th>Complete</th>
            </tr>
          </thead>

          <tbody>
            {getallowefavourowe.map((owed) => (

              <tr key={owed.favour_id}>
               
                <td>{owed.favour_date}</td>
            <td>{owed.user_name}</td>
                <td>{owed.title}</td>
                <td>{owed.favour_type}</td>
                <td>{owed.favour_description}</td>
                <td>{owed.rewards}</td>
                <td>{owed.recieving_username}</td>
                <td>
                  <img src={owed.favour_image} alt="favour image" />
                </td>
                <td>
                  <div >
                    <button>
                    <Link to={'/completefavour/' + owed.favour_id}>Complete</Link>
                    </button>
                  </div>
                </td>
                <td>
                  <button>
                <Link to={'/viewowefavour/'+owed.favour_id}>View</Link>
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default ExistingFavours;