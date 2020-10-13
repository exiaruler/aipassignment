import React, { useState } from "react";


//class FavourRequest extends React.Component {
   // constructor(props) {
      //  super(props);

    const FavourRequest = () => {
        const [inputs, setInputs] = useState({
            title: "",
            description: "",
            reward: "",
            image:"",
        });

        const { title, description, reward, image } = inputs;

        const onChange = (e) =>
        setInputs({ ...inputs,[e.target.name]: e.target.files ? e.target.files[0]:e.target.value
        });

        const onSubmitForm = async (e) => {
            e.preventDefault();
            try {
              const body = { title, description, reward, image};
              const formData = new FormData()
              formData.append('title', title);
              formData.append('description', description);
              formData.append('reward', reward);
              formData.append('image', image);
              const response = await fetch("http://localhost:5000/request/addFavourRequest", {
                method: "POST",
                body:formData,
              });
              
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
                    <form onSubmit={onSubmitForm} enctype="multipart/form-data"  method="post">
                    <p>
                    <label>Favour title</label>
                        <input type="text"
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e) => onChange(e)}>
                        </input>
                    </p>
                    <p>
                    <label>Description</label>
                        <input type="text"
                        value={description}
                        id="description"
                        name="description"
                        onChange={(e) => onChange(e)}>
                        </input>
                    </p>
                    <p>
                    <label>Reward</label>
                        <input type="text"
                        id="reward"
                        name="reward"
                        onChange={(e) => onChange(e)}
                        value={reward}>
                        </input>
                    </p>
                    <p>
                    <label>Image</label>
                        <input type="file" 
                        type="file" 
                        accept="image/*"
                        id="image"
                        name="image"
                        onChange={(e) => onChange(e)}>
                        </input>
                    </p>
                    <input type="submit" name="Submit"></input>

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