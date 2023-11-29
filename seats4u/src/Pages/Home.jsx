import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
	const [redraw] = React.useState(0);

	const navigate = useNavigate();

	return (
		<div className="Home">
			<button onClick={() => navigate('venuemanager')}>Venue Manager Page</button>
			<button onClick={() => navigate('admin')}>Admin Page</button>
		</div>
	);
};