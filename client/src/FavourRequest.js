import React, { useState } from "react";
import { toast } from "react-toastify";
//class FavourRequest extends React.Component {
// constructor(props) {
//  super(props);

const FavourRequest = () => {
  const [inputs, setInputs] = useState({
    title: "",
    favour_description: "",
    rewards: "",
  });

  function submit_form() {
    document.submit.reset();
  }

  const { title, favour_description, rewards } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { title, favour_description, rewards };
      //const formData = new FormData()
      //formData.append('title', title);
      //formData.append('favour_description', favour_description);
      //formData.append('rewards', rewards);
      const response = await fetch(
        "http://localhost:5000/request/addFavourRequest",
        {
          method: "POST",
          headers: {
            jwtToken: localStorage.jwtToken,
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  //}
  //render() {
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
              <p>
                <label>Favour title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  type="text"
                  value={title}
                  onChange={(e) => onChange(e)}
                ></input>
              </p>
              <p>
                <label>Description</label>
                <input
                  type="text"
                  value={favour_description}
                  id="favour_description"
                  name="favour_description"
                  onChange={(e) => onChange(e)}
                ></input>
              </p>
              <p>
                <label>Reward</label>
                <input
                  type="text"
                  id="rewards"
                  name="rewards"
                  onChange={(e) => onChange(e)}
                  value={rewards}
                ></input>
              </p>

              <input
                type="submit"
                name="Submit"
                onclick="submit_form()"
              ></input>
            </form>
          </div>
        </div>
      </body>
    </html>
  );
};
/*    }
}*/

export default FavourRequest;
