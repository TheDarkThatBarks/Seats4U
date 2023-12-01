import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteVenue } from '../controller/DeleteVenue';

export const VenueManagerPage = () => {
	const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{}, [redraw]);

    const requestRedraw = () => {
        forceRedraw(redraw+1)
    }

	const navigate = useNavigate();

    const deleteVenueManager = (e) => {
        deleteVenue(requestRedraw)
    }

	return (
		<div className="Venue Manager">
			<button onClick={() => navigate('createvenue')}>Create Venue</button>
            <button onClick={() => navigate('createshow')}>Create Show</button>
            <button onClick={deleteVenueManager}>Delete</button>
            result: <input id="db-response" readOnly/>
            <button onClick={() => navigate(-1)}>Back</button>
		</div>
	);
};