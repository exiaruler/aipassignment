import React from 'react';


class OweRequest extends React.Component {
    constructor(props) {
        super(props);
        
       
        
    }




    render() {
        return (
            <div>
               <h2>Favour Owe Request</h2>
<div>
<form>
    <p>
<label>Favour title</label>
<input type="text"></input>
</p>
<p>
<label>Friend Username</label>
<input type="text"></input>
</p>
<p>
<label>Description</label>
<input type="text"></input>
</p>
<p>
<label>Reward</label>
<input type="text"></input>
</p>
<p>
    <label>Image</label>
    <input type="file" accept="image"></input>
</p>
<input type="submit"></input>

</form>

</div>
            </div>
        );
    }
}

export default OweRequest;