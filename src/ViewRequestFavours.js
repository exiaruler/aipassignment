import React from 'react';
class ViewRequestFavours extends React.Component {

    render() {
        return(
        <html lang="en">
        <div>
            <h2>Favours</h2>
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
        </html>
        );
    }

}

export default ViewRequestFavours;