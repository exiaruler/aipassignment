import React from 'react';


class FavourRequest extends React.Component {
    constructor(props) {
        super(props);
        
       
        
    }
    render() {
        return (
            <html lang="en">
            <body>
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
            </body>
            </html>
        );
    }
}

export default FavourRequest;