import React from 'react';
import './jumbotron-narrow.css'
//import './bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <title>Home</title>
      </head>

      <body>

        <div class="container">
          <div class="header clearfix">
            <nav>
              <ul class="nav nav-pills pull-right">
                <li role="presentation" class="active"><a href="#">Sign Up</a></li>
                <li role="presentation" class="active"><a href="#">Sign In</a></li>
              </ul>
            </nav>
            <h3 class="text-muted">Logo</h3>
          </div>

          <div class="jumbotron">
            <h1>Favours Table</h1>
          </div>

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

          <footer class="footer">
            <p>&copy; Adv Internet Programing</p>
          </footer>
        </div>

      </body>
      </html>
    );
  }
}

export default App;
