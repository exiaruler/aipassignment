import React from 'react';
import './jumbotron-narrow.css';
import './bootstrap.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <html lang="en">
          <br></br>
          <br></br>
          <h1>Leaderboard</h1>
          <body>
          <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" 
              aria-haspopup="true" aria-expanded="false">Dropdown button
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
              </div>
          </div>
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Favours Completed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Kevin</td>
                    <td>999</td>
                  </tr>
                </tbody>
              </table>
            </body>
        </html>
        );
    }
}

export default Leaderboard;