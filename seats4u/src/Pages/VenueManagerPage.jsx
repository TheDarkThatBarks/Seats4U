import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVenue } from '../controller/DeleteVenue';
import { listShowsByVenue } from '../controller/ListShowsByVenue';
import { deleteShowVM } from '../controller/DeleteShowVM';

export const VenueManagerPage = () => {
	const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(() => {
        listShowsByVenue()
    }, [redraw]);

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
            <button onClick={() => navigate('createshow')}>Create Show</button>
            <button onClick={deleteVenueManager}>Delete</button>
            result: <input id="db-response" readOnly/>
            showID: <input id="show-ID"/>
            <button onClick={() => deleteShowVM(requestRedraw)}>Delete Show</button>
            <button onClick={() => navigate(-1)}>Back</button>
            <div id="venue-show-list"/>
		</div>
	);
};