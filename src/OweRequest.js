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
<label>Exchange</label>
<input type="text"></input>
</p>
<input type="submit"></input>

</form>

</div>
            </div>
        );
    }
}

export default OweRequest;