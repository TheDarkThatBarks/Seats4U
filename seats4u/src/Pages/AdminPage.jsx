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
        document.getElementById("data-venue-name").value = document.getElementById("venue-name-delete").value;
        document.getElementById("data-venue-password").value = document.getElementById("venue-password").value;
        deleteVenue(requestRedraw);
    };
    
    return (
        <div>
            <h1>Delete a Venue</h1>
            Venue Name: <input id="venue-name-delete"/>
            Venue Password: <input id="venue-password"/>
            <button onClick={deleteVenueManager}>Delete</button>
            <h1>Delete a Show</h1>
            showID: <input id="show-ID"/>
            <button onClick={() => deleteShowAdmin(requestRedraw)}>Delete Show</button>
            <h1>Server Response</h1>
            result: <input id="db-response" readOnly/>
            <h1>Other Actions</h1>
            Venue Name: <input id="venue-name-list"/>
            <button onClick={listShowsAdmin}>Generate Show Report</button>
            <br></br>
            <button onClick={() => navigate(-1)}>Back to Home</button>
            <h1>List of Venues</h1>
            <div id="venue-list"></div>
            <h1>Show Report</h1>
            <div id="show-list"></div>
        </div>
    );
}