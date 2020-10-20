import React, { useEffect, useState } from 'react';
//class ViewRequestFavours extends React.Component {


const ViewRequestFavours = () => {

      const [favourRequest, setFavourRequest] = useState([]);

      const getFavourRequest = async () => {
        try {
          const response = await fetch("http://localhost:5000/request/getAllFavourRequest");
          const jsonData = await response.json();

          setFavourRequest(jsonData)
        } catch (err) {
          console.error(err.message);
        }
      }

      useEffect(() => {
        getFavourRequest();
      }, []);

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
                  {/* <tr>
                    <td>14/10/20</td>
                    <td>Kevin11</td>
                    <td>Clean fridge</td>
                    <td>Clean kitchen fridge</td>
                    <td>Coffee</td>
                  </tr>*/}
                  {favourRequest.map(favourRequest => (
                    <tr>
                      <td>{favourRequest.date}</td>
                      <td>{favourRequest.username}</td>
                      <td>{favourRequest.title}</td>
                      <td>{favourRequest.favour_description}</td>
                      <td>{favourRequest.rewards}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </body>
        </html>
        );
             
};


export default ViewRequestFavours;