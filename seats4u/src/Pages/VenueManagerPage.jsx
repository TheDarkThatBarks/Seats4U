import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVenue } from '../controller/DeleteVenue';
import { listShowsByVenue } from '../controller/ListShowsByVenue';
import { deleteShowVM } from '../controller/DeleteShowVM';
import { activateShow } from '../controller/ActivateShow';

export const VenueManagerPage = () => {
	const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(() => {}, [redraw]);

    const requestRedraw = () => {
        forceRedraw(redraw + 1);
    };

	const navigate = useNavigate();

    const deleteVenueManager = (e) => {
        deleteVenue(requestRedraw);
        navigate(-1);
    };

	return (
		<div className="Venue Manager">
            <h1>Venue: {document.getElementById("data-venue-name").value}</h1>
            <button onClick={() => navigate('createshow')}>Create A Show</button>
            <br></br>
            <button onClick={deleteVenueManager}>Delete This Venue</button>
            <br></br>
            showID: <input id="show-ID"/>
            <button onClick={() => activateShow(requestRedraw)}>Activate Show</button>
            <button onClick={() => deleteShowVM(requestRedraw)}>Delete Show</button>
            <br></br>
            result: <input id="db-response" readOnly/>
            <br></br>
            <button onClick={() => navigate(-1)}>Back</button>
            <button onClick={listShowsByVenue}>Generate Shows Report</button>
            <div id="venue-show-list"/>
		</div>
	);
};