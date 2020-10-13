import React, { useEffect, useState } from "react";

const CompleteFavour = ({ setAuth }) => {
    const [getallowefavour, setAllOweFavour] = useState([]);

    return(
        <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      <body>
        <div class="container">
       <form>
           <input type="file" accept="image"/>
           <input type="submit">Submit</input>
       </form>
        </div>
      </body>
    </html>
    );
};
export default CompleteFavour;
  