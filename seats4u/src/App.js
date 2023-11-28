import './App.css';

import React from 'react'
import { createVenue } from './controller/CreateVenue.js';

function App() {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(() => {
    }, [redraw]);

    // this function requests the redraw, and can be passed as an argument to other functions
    const requestRedraw = () => {
        forceRedraw(redraw + 1);
    };

    const createVenueHandler = (e) => {
        createVenue(requestRedraw);
    };

    return (
        <div className="Seats4U">
            <h1> Create Venue </h1>
            name: <input id="venue-name" />
            side left rows: <input id="venue-sideLeft-rows" />
            side left cols: <input id="venue-sideLeft-cols" />
            center rows: <input id="venue-center-rows" />
            center cols: <input id="venue-center-cols" />
            side right rows: <input id="venue-sideRight-rows" />
            side right cols: <input id="venue-sideRight-cols" />
            password: <input id="venue-password" />
            <button onClick={createVenueHandler}> Create </button>
        </div>
    );
}

export default App;