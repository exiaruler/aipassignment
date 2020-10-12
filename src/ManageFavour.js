import './jumbotron-narrow.css'
import './bootstrap.css'

import React, {  useEffect, useState } from "react";
const ManageFavour  = () =>  {
    const [getallowefavour, setAllOweFavour] = useState([]);

    //display favours
    const getAllOweFavour = async () => {
        try {
          const response = await fetch("http://localhost:5000/getallowefavour");
          const jsonData = await response.json();
    
          setAllOweFavour(jsonData);
        } catch (err) {
          console.error(err.message);
        }
      };
    
      // update favours
      const updateFavour = ({ getallowefavour }) => {
        const []
      }


      // delete favours
      const deleteFavour= async id =>{
        try {
            const deleteFavour = await fetch(`http://localhost:5000/deleteowefavour/${id}`, {
              method: "DELETE"
            });
      
            setAllOweFavour(getallowefavour.filter(fav => fav.favour_id !== id));
          } catch (err) {
            console.error(err.message);
           
          }
      };
    
      useEffect(() => {
        getAllOweFavour();
      }, []);
    
   
        return(
        <html lang="en">
        <div>
            <h1>Manage Favour Requests</h1>
        </div>

        <body>
        <table class="table table-striped">
          <thead>
            <tr>
                <th>Favour Title</th>
                <th>Favour Description</th>
                <th>Reward</th>
                <th>Favour To Who</th>
                <th>Image</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
          </thead>

          <tbody>
               {getallowefavour.map(owe => (
            <tr key={owe.favour_id}>
              <td>
                {owe.title}
              </td>
              <td>{owe.favour_description}</td>
              <td>
              {owe.rewards}
              </td>
              <td>
                {owe.recieving_username}
              </td>
              <td>
                  {owe.favour_image }
              </td>
              <td>
                <button
                className="btn btn-primary"
                onClick={() => updateFavour(owe.favour_id)}>
                  Update
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
        </body>
        </html>
            );
    };



export default ManageFavour;