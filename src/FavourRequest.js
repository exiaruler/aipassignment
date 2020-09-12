import React from 'react';


class FavourRequest extends React.Component {
    constructor(props) {
        super(props);
        
       
        
    }




    render() {
        return (
            <div>
               <h2>Favour Request</h2>
<div>
<form>
    <p>
<label>Favour title</label>
<input type="text"></input>
</p>
<p>
<label>Description</label>
<input type="text"></input>
</p>
<p>
<label>reward</label>
<input type="text"></input>
</p>
<input type="submit"></input>

</form>

</div>
            </div>
        );
    }
}

export default FavourRequest;