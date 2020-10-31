/***************************************************************************************************************
 *    Title: pern-jwt-tutorial
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-jwt-tutorial/blob/master/client/src/App.js
 *
 ***************************************************************************************************************/

import React, { useEffect, useState } from "react";
import "../Styling/jumbotron-narrow.css";
import "../Styling/bootstrap.css";

const Leaderboard = ({ setAuth }) => {
  // ------------------------------------------------
  // Set up variables for sql table
  // ------------------------------------------------
  const [board, setBoard] = useState([]);
  // ------------------------------------------------
  // Handle useEffect to recieve Leaderboard
  // ------------------------------------------------
  const getLeaderboard = async () => {
    try {
      // Send to sever JWT token
      const res = await fetch("http://localhost:5000/auth/leaderboard", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });

      const parseData = await res.json(); // Recieve back sql Leaderboard table
      setBoard(parseData); // Assign Leaderboard table to variable
    } catch (err) {
      console.error(err.message);
    }
  };
  // ------------------------------------------------
  // Handle useEffect to recieve JWT token
  // ------------------------------------------------
  // ------------------------------------------------
  // Reference :  pern-jwt-tutorial
  // ------------------------------------------------
  const checkAuthenticated = async () => {
    try {
      // Send to sever JWT token
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });
      const parseRes = await res.json(); // Recieve back 'true' in header

      if (parseRes == true) {
        // Set 'true' if 'true' in header
        setAuth(true);
      } else {
        // Set 'false' if not 'true' in header
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  // ------------------------------------------------
  // Execute 'checkAuthenticated' function
  // ------------------------------------------------
  useEffect(() => {
    checkAuthenticated();
  }, []);
  // ------------------------------------------------
  // Execute 'getLeaderboard' function
  // ------------------------------------------------
  useEffect(() => {
    getLeaderboard();
  }, []);
  // ------------------------------------------------
  // Display Leaderboard
  // ------------------------------------------------
  return (
    <html lang="en">
      <br></br>
      <br></br>
      <h1>Top 10 Leaderboard – Uncompleted Favour Owe</h1>
      <body>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Ranking</th>
              <th scope="col">Username's</th>
              <th scope="col">Favours Uncompleted</th>
            </tr>
          </thead>
          <tbody>
            {board.map((el) => (
              <tr>
                <td>{el.rank}</td>
                <td>{el.recieving_username}</td>
                <td>{el.favours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </body>
    </html>
  );
};

export default Leaderboard;
