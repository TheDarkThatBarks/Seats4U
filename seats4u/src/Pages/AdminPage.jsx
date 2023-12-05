import { useNavigate } from 'react-router-dom';
import React from 'react';
import { listVenues } from '../controller/ListVenues';
import { deleteVenue } from '../controller/DeleteVenue';
import { deleteShowAdmin } from '../controller/DeleteShowAdmin';
import { listShowsAdmin } from '../controller/ListShowsAdmin';

export const AdminPage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{
        listVenues();
    }, [redraw]);

    const navigate = useNavigate();

    const requestRedraw = () => {
        forceRedraw(redraw + 1);
    };

    const deleteVenueManager = () => {
        document.getElementById("data-venue-name").value = document.getElementById("venue-name").value;
        document.getElementById("data-venue-password").value = document.getElementById("venue-password").value;
        deleteVenue(requestRedraw);
    };
    
    return (
        <div>
            <br></br>
            Venue Name: <input id="venue-name"/>
            Venue Password: <input id="venue-password"/>
            <button onClick={deleteVenueManager}>Delete</button>
            <br></br>
            result: <input id="db-response" readOnly/>
            showID: <input id="show-ID"/>
            <button onClick={() => deleteShowAdmin(requestRedraw)}>Delete Show</button>
            <br></br>
            <button onClick={() => listShowsAdmin("")}>Generate Show Report</button>
            <br></br>
            <button onClick={() => navigate(-1)}>Back</button>
            <div id="venue-list"></div>
            <br></br>
            <div id="show-list"></div>
        </div>
    );
}