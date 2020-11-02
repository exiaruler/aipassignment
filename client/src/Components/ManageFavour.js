/***************************************************************************************************************
 *    Title: pern-todo-app
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-todo-app/blob/master/client/src/components/ListTodo.js
 *
 ***************************************************************************************************************/

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  BrowserRouter
    as Router, Switch, Route, Link, useParams, BrowserRouter
} from "react-router-dom";

const ManageFavour = ({ setAuth }) => {
  const [getallowefavour, setAllOweFavour] = useState([]);
  const [getallowefavourlive, setAllOweFavourLive] = useState([]);
  const [getallowefavourcomplete, setAllOweFavourComplete] = useState([]);
  const [favourRequest, setFavourRequest] = useState([]);
  /*
  Display favours 
  */
  /*
  Favour History of past favours
  */
  const getAllFavours = async (e) => {
    try {
      const response = await fetch(
        "http://localhost:5000/owe/getallowefavour",
        {
          method: "GET",
          //get jwt token from storage during query 
          headers: {
            jwtToken: localStorage.jwtToken,
          },
        }
      );
      const jsonData = await response.json();
      //authenticate if there jwt token
      if (jsonData.jwtToken) {
        localStorage.setItem("jwtToken", jsonData.jwtToken);
        setAuth(true);


      }
      //set  jsondata 
      setAllOweFavour(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };
  /*
 Get favours that are currently owed that have not been completed that is requested from the user
*/
  const getAllFavoursOwed = async (e) => {

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


      }
      setAllOweFavourLive(jsonData);

    } catch (err) {
      console.error(err.message);
    }
  };
  /*
   Get favours that are requested
  */
  const getFavourRequest = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/request/getAllFavourRequest",
        {
          method: "GET",
          headers: {
            jwtToken: localStorage.jwtToken,
          },
        },

      );
      const jsonData = await response.json();

      setFavourRequest(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };


  /*
   Delete owed favour
  */
  const deleteFavour = async (id) => {
    try {
      //Delete favour by id by row selected 
      const deleteFavour = await fetch(
        `http://localhost:5000/owe/deleteowefavour/${id}`,
        {
          method: "DELETE",
        }
      );
      //notification when deleted
      toast.success("Favour Owed Deleted");
      //refresh json data in web page
      setAllOweFavour(getallowefavour.filter((fav) => fav.favour_id !== id));
      setAllOweFavourLive(getallowefavour.filter((fav) => fav.favour_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  /*
  Delete request favour
 */
  const deleteFavourRequest = async (id) => {
    try {
      console.log(id)
      const deleteFavourRequest = await fetch(
        `http://localhost:5000/request/deleteFavourRequest/${id}`,
        {
          method: "DELETE",
        }
      );
      toast.success("Favour Request Deleted");
      setFavourRequest(favourRequest.filter((favour) => favour.favour_id !== id));
    } catch (err) {
      console.error(err.message);
    }

  };

  //set effect on webpage
  useEffect(() => {
    getAllFavours();
  }, []);

  useEffect(() => {
    getAllFavoursOwed();
  }, []);

  useEffect(() => {
    getFavourRequest();
  }, []);

  //web page
  return (
    <html lang="en">
      <br></br>
      <br></br>
      <div>
        <h1>Manage Favour Requests</h1>
      </div>
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
              <th>Update</th>
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
                    className="btn btn-primary"> Update
                    <Link to={'/updateowefavour/' + owe.favour_id}></Link>
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
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Current favours owed</h2>
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
              <th>Complete</th>
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
                  <div>
                    <button>
                      <Link to={'/completefavour/' + owed.favour_id}>Complete</Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Current Favour Requests</h2>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Favour</th>
              <th scope="col">Description</th>
              <th scope="col">Reward</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {favourRequest.map((favourRequests) => (
              <tr key={favourRequests.favour_id}>
                <td>{favourRequests.favourrequest_date}</td>
                <td>{favourRequests.title}</td>
                <td>{favourRequests.favour_description}</td>
                <td>{favourRequests.rewards}</td>
                <td>
                  <button className="btn btn-primary" > Update
                  <Link to={'/updatefavourrequest/' + favourRequests.favour_id}></Link>
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteFavourRequest(favourRequests.favour_id)}
                  >
                    Delete
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
        </table>
      </body>


    </html>

  );

};

export default ManageFavour;
