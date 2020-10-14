import React from 'react';
class ViewRequestFavours extends React.Component {

    render() {
        return(
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
                  <tr>
                    <td>14/10/20</td>
                    <td>Kevin11</td>
                    <td>Clean fridge</td>
                    <td>Clean kitchen fridge</td>
                    <td>Coffee</td>
                  </tr>
                </tbody>
              </table>
            </body>
        </html>
        );
    }

}

export default ViewRequestFavours;