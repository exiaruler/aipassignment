import React from 'react';
import RequestForm from './FavourRequest';
import OweRequest from './OweRequest';
const REQUEST = 'Request Favour';
const OWE = 'Record Favour';


class SelectForm extends React.Component {

    constructor(props) {
        super(props);
        
       
        this.state = { show:REQUEST};
    }
   
    render() {
       //switch between javascript forms of creating a favour 
        let form;
        if (this.state.show === REQUEST)
            form = <RequestForm/>;
        else
            form = <OweRequest/>;

        return (
            <html lang="en">
                <br></br>
                <br></br>
                <h1>Select Favour</h1>
                    <body>
                        <div>
                            <button onClick={() => this.setState({show: REQUEST})}>{REQUEST}</button>
                            <button onClick={() => this.setState({show: OWE})}>{OWE}</button>
                        </div>
                        { form }
                </body>
            </html>
        );
    }
}

export default SelectForm ;