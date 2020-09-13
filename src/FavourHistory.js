import React from 'react';

class FavourHistory extends React.Component {

    render() {
        return(
        <html lang="en">
        <div>
            <h2>Manage Favours History</h2>
        </div>

        <table>
            <tr>
                <th colspan="3">Past Favours</th>
                <th>Favour #</th>
                <th>Favour Name</th>
                <th>Favour To Who</th>
            </tr>
        </table>

        </html>
        );
    }

}

export default FavourHistory;