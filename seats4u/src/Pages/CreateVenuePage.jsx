import { useNavigate } from 'react-router-dom';
import React from 'react';
import { createVenue } from '../controller/CreateVenue';

export const CreateVenuePage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{}, [redraw]);

    const navigate = useNavigate();

    const createVenueHandler = (e) => {
        createVenue(requestRedraw);
    }

    const requestRedraw = () => {
        forceRedraw(redraw+1);
    }
    
    return (
        <div className="Seats4U">
            <h1>Enter Information Here</h1>
            name: <input id="venue-name"/>
            <br></br>
            side left rows: <input id="venue-sideLeft-rows"/>
            <br></br>
            side left cols: <input id="venue-sideLeft-columns"/>
            <br></br>
            center rows: <input id="venue-center-rows"/>
            <br></br>
            center cols: <input id="venue-center-columns"/>
            <br></br>
            side right rows: <input id="venue-sideRight-rows"/>
            <br></br>
            side right cols: <input id="venue-sideRight-columns"/>
            <br></br>
            password: <input id="venue-password"/>
            <br></br>
            <button onClick={createVenueHandler}>Create</button>
            <button onClick={() => navigate(-1)}>Back to Home</button>
            <h1>Server Response</h1>
            result: <input id="db-response" readOnly/>
        </div>
    );
}