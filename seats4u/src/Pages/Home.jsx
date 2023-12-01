import React from 'react';
import { useNavigate } from 'react-router-dom';
import { listShows } from '../controller/ListShows';

export const Home = () => {
	const [redraw, forceRedraw] = React.useState(0);

	React.useEffect(()=>{
		listShows("")
	}, [redraw]);

	const requestRedraw = () => {
		forceRedraw(redraw + 1)
	}
	
    const search = () => {
        listShows(document.getElementById("search").value);
    }

	const navigate = useNavigate();

	return (
		<div className="Home">
			<button onClick={() => navigate('venuemanager')}>Venue Manager Page</button>
			<button onClick={() => navigate('admin')}>Admin Page</button>
            Search: <input id="search"/>
            <button onClick={search}>Search</button>
			<div id="show-list"></div>
		</div>
	);
};