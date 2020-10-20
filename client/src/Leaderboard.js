import React, { useEffect, useState } from "react";
import "./jumbotron-narrow.css";
import "./bootstrap.css";

const Leaderboard = ({ setAuth }) => {
  const [board, setBoard] = useState([]);
  const getLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/leaderboard", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });

      const parseData = await res.json();
      setBoard(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { jwtToken: localStorage.jwtToken },
      });

      const parseRes = await res.json();
      if (parseRes) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    getLeaderboard();
  }, []);

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
