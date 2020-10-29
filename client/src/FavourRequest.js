import React, { useState } from "react";
import { toast } from "react-toastify";

/*
 * Set variables for input fields as null
 */
const FavourRequest = () => {
  const [inputs, setInputs] = useState({
    title: "",
    favour_description: "",
    rewards: "",
  });

/*
 * Resets input fields after submission
 */
function submit_form() {
  document.submit.reset();
}
  
/*
 * Let inputs = table data
 */
const { title, favour_description, rewards } = inputs;

/*
 * Respond to changes in input fields
 */
const onChange = (e) =>
  setInputs({ ...inputs, [e.target.name]: e.target.value });

/*
 * Submit button creates favour request
 */
const onSubmitForm = async (e) => {
  e.preventDefault();
  try {
    const body = { title, favour_description, rewards };
    const response = await fetch(
      "http://localhost:5000/request/addFavourRequest",
      {
        method: "POST",
        headers: {
          jwtToken: localStorage.jwtToken,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
    toast.success("Favour request added!");
    window.location = "/";
  } catch (err) {
    console.error(err.message);
  }
};

/*
 * Html/CSS elements
 */
return (  
  <html lang="en">
    <body>
      <div>
        <h2>Favour Request</h2>
          <div>
            <form
              name="submit"
              onSubmit={onSubmitForm}
              enctype="multipart/form-data"
              method="post"
            >
              <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Favour Title</span>
              </div>
              <input
                type="text"
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => onChange(e)}
                required
                class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              ></input>

              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Description</span>
              </div>
              <input
                type="text"
                value={favour_description}
                id="favour_description"
                name="favour_description"
                onChange={(e) => onChange(e)}
                required
                class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              ></input>
              
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Reward</span>
              </div>
              <input
                type="text"
                id="rewards"
                name="rewards"
                onChange={(e) => onChange(e)}
                value={rewards}
                required
                class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
              ></input>
            </div>

            <br></br>
            <input
              type="submit"
              name="Submit"
              class="btn btn-success"
              onclick="submit_form()"
            ></input>

          </form>
        </div>
      </div>
    </body>
  </html>
  );
};

export default FavourRequest;
