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
            side left rows: <input id="venue-sideLeft-rows"/>
            side left cols: <input id="venue-sideLeft-columns"/>
            center rows: <input id="venue-center-rows"/>
            center cols: <input id="venue-center-columns"/>
            side right rows: <input id="venue-sideRight-rows"/>
            side right cols: <input id="venue-sideRight-columns"/>
            password: <input id="venue-password"/>

            <button onClick={createVenueHandler}>Create</button>

            result: <input id="db-response" readOnly/>

            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}