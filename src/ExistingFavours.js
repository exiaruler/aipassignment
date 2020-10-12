import React, { useEffect, useState } from "react";
const ExistingFavours = ({ setAuth }) => {
  const [getallowefavour, setAllOweFavour] = useState([]);

  //display favours

  const getAllFavours = async (e) => {
    //e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/owe/getallowedfavour",
        {
          method: "GET",
          headers: {
            jwtToken: localStorage.jwtToken,
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData.jwtToken) {
        localStorage.setItem("jwtToken", jsonData.jwtToken);
        setAuth(true);
      } else {
        //setAuth(false);
      }

      
      setAllOweFavour(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const completeFavour= async (e)=>{
     
  }

 

  useEffect(() => {
    getAllFavours();
  }, []);

  return (
    <html lang="en">
      <div>
        <h1>Existing Owed Favours</h1>
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
              <th>Complete</th>
            </tr>
          </thead>

          <tbody>
            {getallowefavour.map((owe) => (
              <tr key={owe.favour_id}>
                <td>{owe.title}</td>
                <td>{owe.favour_description}</td>
                <td>{owe.rewards}</td>
                <td>{owe.recieving_username}</td>
                <td>
                  <img src={owe.favour_image} alt="favour image" />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    //onClick={() => deleteFavour(owe.favour_id)}
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

export default ExistingFavours;