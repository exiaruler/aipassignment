import React, { useEffect, useState } from "react";
import UpdateOweFavour from "./UpdateOweFavour";
import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";
const ExistingFavours = ({ setAuth }) => {
  const [getallowefavourowe, setAllOweFavour] = useState([]);

  //display favours

  const getAllFavours = async (e) => {
    //e.preventDefault();
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
        //setAuth(false);
      }

      
      setAllOweFavour(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  
  useEffect(() => {
    getAllFavours();
  }, []);

  return (
    <html lang="en">
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
              <td>Favour Type</td>
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