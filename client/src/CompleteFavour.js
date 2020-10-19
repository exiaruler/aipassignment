
import React, { useEffect, useState } from "react";
import "./bootstrap.css";

const CompleteFavour = ({ setAuth, ...props }) => {

  const [favour, setFavour] = useState({});
  const [inputs, setInputs] = useState({
    imageComplete: "",
  });

  const { imageComplete } = inputs;


  const onChange = (e) =>
    setInputs({
      ...inputs, [e.target.name]: e.target.files ? e.target.files[0] : e.target.value
    });


  /*
        const onSubmitForm = async (e) => {
          e.preventDefault();
          try {
            const body = {image};
            const formData = new FormData()
            formData.append('image',image);
            const response = await fetch("http://localhost:5000/owe/completefavourowe/", {
              method: "PUT",
              headers: {
                jwtToken: localStorage.jwtToken,
              },
              body:formData,
            });
            
          } catch (err) {
            console.error(err.message);
          }
        };
       */

      const getFavour = async (e) => {
        //e.preventDefault();
        try {
          const { id } = props.match.params;
          console.log('fetch', id);
          const res = await fetch(
            "http://localhost:5000/owe/getowefavourid/" + [id],
            {
              method: "GET",
            }
          );
          //const jsonData = await response.json();
          const parseData = await res.json();
          //setTitle(parseData.title);
            
        } catch (err) {
          console.error(err.message);
        }
      };
    
    
    
      useEffect(() => {
        getFavour();
      }, []);
    
    
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
      <div>
  <h2> Favour title:</h2>
          <p></p>
          <p></p>
          <p></p>
          <img />
        </div>
        <div>
          <form>
            <input accept="image" type="file" />
            <input type="submit" />
          </form>
        </div>
      </body>
    </html>
  );

};
export default CompleteFavour;