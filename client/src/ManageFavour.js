import React, { useEffect, useState } from "react";

import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";

const ManageFavour = ({ setAuth }) => {
  const [getallowefavour, setAllOweFavour] = useState([]);
  const [getallowefavourlive, setAllOweFavourLive] = useState([]);
  const [getallowefavourcomplete, setAllOweFavourComplete] = useState([]);
  //display favours
  const getAllFavours = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/owe/getallowefavour",
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

  const getAllFavoursLive = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/owe/getallliveowefavour",
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
      setAllOweFavourLive(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };

  const getAllFavoursComplete = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/owe/getcompleteowedfavour",
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
      setAllOweFavourComplete(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };


  // delete favours
  const deleteFavour = async (id) => {
    try {
      const deleteFavour = await fetch(
        `http://localhost:5000/owe/deleteowefavour/${id}`,
        {
          method: "DELETE",
        }
      );

      setAllOweFavour(getallowefavour.filter((fav) => fav.favour_id !== id));
      setAllOweFavourLive(getallowefavour.filter((fav) => fav.favour_id !== id));
      setAllOweFavourComplete(getallowefavour.filter((fav) => fav.favour_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getAllFavours();
  }, []);

  useEffect(() => {
    getAllFavoursLive();
  }, []);
  useEffect(() => {
    getAllFavoursComplete();
  }, []);



  return (
    <html lang="en">
        <br></br>
        <br></br>
        <h1>Favour History</h1>
      <body>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Favour Title</th>
              <th>Favour Type</th>
              <th>Favour Description</th>
              <th>Reward</th>
              <th>Favour To Who</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {getallowefavour.map((owe) => (
              <tr key={owe.favour_id}>
                <td>{owe.favour_date}</td>
                <td>{owe.title}</td>
                <td>{owe.favour_type}</td>
                <td>{owe.favour_description}</td>
                <td>{owe.rewards}</td>
                <td>{owe.recieving_username}</td>
                <td>
                  <img src={owe.favour_image} alt="favour image" />
                </td>
                <td>
                  <button
                    className="btn btn-primary">
                    <Link to={'/updateowefavour/' + owe.favour_id}> Update </Link>
                    
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFavour(owe.favour_id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button>
                <Link to={'/viewowefavour/'+owe.favour_id}>View</Link>
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Current Favours that are owed</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Favour Title</th>
              <th>Favour Type</th>
              <th>Favour Description</th>
              <th>Reward</th>
              <th>Favour To Who</th>
              <th>Image</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {getallowefavourlive.map((owed) => (

              <tr key={owed.favour_id}>
                <td>{owed.favour_date}</td>
                <td>{owed.title}</td>
                <td>{owed.favour_type}</td>
                <td>{owed.favour_description}</td>
                <td>{owed.rewards}</td>
                <td>{owed.recieving_username}</td>
                <td>
                  <img src={owed.favour_image} alt="favour image" />
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                  //onClick={() => updateFavour(owe.favour_id)}>
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFavour(owed.favour_id)}
                  >
                    Delete
                  </button>
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
        <h2>Favours Completed</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Favour Title</th>
              <th>Favour Type</th>
              <th>Favour Description</th>
              <th>Reward</th>
              <th>Favour To Who</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {getallowefavourcomplete.map((owe) => (
              <tr key={owe.favour_id}>
                <td>{owe.favour_date}</td>
                <td>{owe.title}</td>
                <td>{owe.favour_type}</td>
                <td>{owe.favour_description}</td>
                <td>{owe.rewards}</td>
                <td>{owe.recieving_username}</td>
                <td>
                  <img src={owe.favour_image} alt="favour image" />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFavour(owe.favour_id)}
                  >
                    Delete
                  </button>
                  <td>
                  <button>
                <Link to={'/viewowefavour/'+owe.favour_id}>View</Link>
                </button>
                </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </body>


    </html>

  );

};

export default ManageFavour;
