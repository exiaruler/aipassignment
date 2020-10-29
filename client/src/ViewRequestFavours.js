import React, { useEffect, useState } from "react";

/*
 * Initialise favourRequest state
 */
const ViewRequestFavours = () => {
  const [favourRequest, setFavourRequest] = useState([]);

/*
 * Retrieves ALL favour requests from database
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
 * Calls getFavourRequest()
 */
useEffect(() => {
  getFavourRequest();
}, []);

/*
 * Html/CSS elements
 */
return (
    <html lang="en">
      <br></br>
      <br></br>
      <h1>Favours</h1>
      <body>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Username</th>
              <th scope="col">Favour</th>
              <th scope="col">Description</th>
              <th scope="col">Reward</th>
            </tr>
          </thead>
          <tbody>
            {favourRequest.map((favourRequests) => (
              <tr>
                <td>{favourRequests.favourrequest_date}</td>
                <td>{favourRequests.user_name}</td>
                <td>{favourRequests.title}</td>
                <td>{favourRequests.favour_description}</td>
                <td>{favourRequests.rewards}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default ViewRequestFavours;
