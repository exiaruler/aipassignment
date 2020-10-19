import React, { useEffect, useState } from "react";
//import { Json } from "sequelize/types/lib/utils";
import {toast} from "react-toastify";
//import { json } from "sequelize/types";


// update favour
// favour title, description, rewards


const UpdateFavour = ({ favour }) => {
    
    const [title, setTitle] = useState(favour.title);
    const [description, setDescription] = useState(favour.favour_description);
    const [rewards, setRewards] = useState(favour.rewards);
    const [favourID, setFavourID] = useState(""); 

    // get local item form ManageFavours from samuel
    // change naming convention to apple

    // method: "GET"
    // get owe favours from favour_id through local storage
    const getOweFavours = async (e) => {
        try {
            const response = await fetch ("http://localhost:5000/owe/getowefavour", {
                method: "GET",
                headers: {
                    jwtToken: localStorage.jwtToken,
                },
            });
            const jsonData = await response.json();
            setFavourID(jsonData.favour_id);
            if (jsonData.jwtToken){
                localStorage.setItem("jwtToken", jsonData.jwtToken);
            }
        } catch (error) {
            console.error(error.message);
        }
    };
    
    // localStorage.setItem("favour_ID", id); --> call like this "localStorage.favour_ID"

    
    // POST --> update data into database
    const onSubmitForm = async (e) => { // update
        e.preventDefault();
        try {
          const body = { title, description, rewards };// add local storage "apple = localstorage."
          const response = await fetch("http://localhost:5000/owe/updateOweFavour", {
            method: "POST",
            headers: {
              jwtToken: localStorage.jwtToken,
              "Content-type": "application/json",
            },
            body: JSON.stringify(body),
          });
          const parseRes = await response.json();
    
          if (parseRes.jwtToken) {
            localStorage.setItem("jwtToken", parseRes.jwtToken);
            favour(true);
            toast.success("Update Successfully!");
          } else {
            //setAuth(false); not needed
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
      };

      useEffect(() => {
        getOweFavours();
      }, []); 


    return (
        <html lang="en">
            <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target={`#id${favour.favour_id}`}>
                Edit
            </button>

            
        </html>
    )
};

export default UpdateFavour;


/*const updateTitle = async e => {
        e.preventDefault();
        try {
            // send request to update title
            // package data
            const body = {title};
            // send response to restful API
            const response = await fetch (`http://localhost:5000/getallfavour/${favour.favour_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    const updateDescription = async e => {
        e.preventDefault();
        try {
            // send request to update description
            const body = {description};
            const response = await fetch (`http://localhost:5000/getallfavour/${favour.description}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }

    const updateRewards = async e => {
        e.preventDefault();
        try {
            const body = {rewards};
            const response = await fetch (`http://localhost:5000/getallfavour/${favour.rewards}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    }*/