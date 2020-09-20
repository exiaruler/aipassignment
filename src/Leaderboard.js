import React from 'react';
import './jumbotron-narrow.css'
import './bootstrap.css'
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
        return(
        <html lang="en">
            <div>
            </div>

            <br></br>
            <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Owes this user</th>
                    <th scope="col">Item</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Kevin</td>
                    <td>Kelly</td>
                    <td>coffee</td>
                  </tr>
                </tbody>
              </table>
        </html>
        );
    }
}

export default Leaderboard;