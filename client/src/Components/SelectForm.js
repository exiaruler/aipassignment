/***************************************************************************************************************
 *    Title: aip2020 week 3
 *    Author: Benjamin Johnston
 *    Date: 2020
 *    Code version: 1.0
 *    Availability: https://github.com/benatuts/aip2020/tree/master/week03/withclass/src/Selector
 *
 ***************************************************************************************************************/

import React from 'react';
import RequestForm from '../Favour_Request_Components/FavourRequest';
import OweRequest from '../Owe_Favour_Components/OweRequest';
import "../Styling/jumbotron-narrow.css";
import "../Styling/bootstrap.css";
const REQUEST = 'Request Favour';
const OWE = 'Record Favour';

/*
Handles favour selection form 
*/
class SelectForm extends React.Component {

    constructor(props) {
        super(props);
        
       
        this.state = { show:REQUEST};
    }
   
    render() {
       //switch between files of forms of creating a favour 
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
                            <button onClick={() => this.setState({show: REQUEST})} class="btn btn-primary">{REQUEST}</button>
                            <button onClick={() => this.setState({show: OWE})} class="btn btn-primary">{OWE}</button>
                        </div>
                        { form }
                </body>
            </html>
        );
    }
}

export default SelectForm ;