import React from 'react';
import { Link } from 'react-router-dom';
import { getVenues } from '../controller/GetVenues';

export const Home = () => {
	const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{
        getVenues()
    }, [redraw]);

    // this function requests the redraw, and can be passed as an argument to other functions
    //const requestRedraw = () => {
    //    forceRedraw(redraw+1)
    //}

	return (
		<div className="Home">
			<Link to="/CreateVenuePage">
				<div className="btn">Create Venue</div>
			</Link>
			<div id="venue-list"></div>
		</div>
	);
};