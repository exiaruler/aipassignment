import React, { useState } from "react";

// update favour
// favour title, description, rewards


const UpdateFavour = ({ favour }) => {
    
    const [title, setTitle] = useState(favour.title);
    const [description, setDescription] = useState(favour.favour_description);
    const [rewards, setRewards] = useState(favour.rewards);

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


    // get local item form ManageFavours from samuel
    // change naming convention to apple

    // method: "GET"
    // get owe favours from favour_id through local storage
    
    

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
            setAuth(true);
            toast.success("Edit Successfully!");
          } else {
            //setAuth(false); not needed
            toast.error(parseRes);
          }
        } catch (err) {
          console.error(err.message);
        }
      };
      useEffect(() => {
        getAllFavours();
      }, []); // localStorage.setItem("favour_ID", id); --> call like thid "localStorage.favour_ID"


    return (
        <html lang="en">
            <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target={`#id${favour.favour_id}`}>
                Edit
            </button>

            <div class="modal" id={`id${favour.favour_id}`} onClick = {() => setTitle(favour.title)}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Update Favour</h4>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                onClick = {() => setTitle(favour.title), setDescription(favour.description), setRewards(favour.rewards)}>&times;
                        </button>
                        </div>

                        <div class="modal-body">
                            <input type='text'
                                className="form-control"
                                value={title}
                                onChange={e => setTitle(e.target.value)} />
                        </div>

                        <div class="modal-body">
                            <input type='text'
                                className="form-control"
                                value={description}
                                onChange={e => setDescription(e.target.value)} />
                        </div>

                        <div class="modal-body">
                            <input type='text'
                                className="form-control"
                                value={rewards}
                                onChange={e => setRewards(e.target.value)} />
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal"
                                onClick ={e => updateTitle(e) && updateDescription(e) && updateRewards(e)}>Update
                                
            </button>
                        </div>

                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-danger"
                                data-dismiss="modal">Close
            </button>
                        </div>

                    </div>
                </div>
            </div>
        </html>
    )
};

export default UpdateFavour;