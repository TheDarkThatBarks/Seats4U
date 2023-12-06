import React from 'react';
import { useNavigate } from 'react-router-dom';
import { listShows } from '../controller/ListShows';
import { post } from '../controller/API';
import { lockShow } from '../controller/LockShow';

export const Home = () => {
    const [redraw, forceRedraw] = React.useState(0);

	React.useEffect(() => {
        /*const interval = setInterval(() => {
            listShows("");
        }, 1000);*/
        setTimeout(function() {
            listShows("");
        }, 500);
	}, [redraw]);

	const requestRedraw = () => {
		forceRedraw(redraw + 1)
	}
	
    const search = () => {
        document.getElementById("data-search").value = document.getElementById("search").value;
        listShows();
    };

    const openSeatPage = () => {
        let showID = document.getElementById("show-id").value;
        let shows = JSON.parse(document.getElementById("data-show-list").value);
        let found = false;
        for (let s of shows) {
            console.log(s);
            console.log(s.showID);
            found = showID == s.showID && s.locked == 0;
            if (found)
                break;
        }
        if (found) {
            document.getElementById("data-show-id").value = showID;
            lockShow();
            navigate('buyseats');
        }
    };

    const validateVenueManager = async () => {
        let venueName = document.getElementById("venue-name");
        let venuePassword = document.getElementById("venue-password");

        let data = {
            'venueName': venueName.value,
            'venuePassword': venuePassword.value
        };

        const handler = (json) => {
            console.log(json);
            if (json.statusCode === 200) {
                console.log("TRUE");
                document.getElementById("data-venue-name").value = json.venue.name;
                document.getElementById("data-venue-id").value = json.venue.venueID;
                document.getElementById("data-venue-password").value = json.venue.password;
                navigate('venuemanager');
            } else {
                console.log("FALSE");
            }
        };

        post('/venue/login', data, handler);
    };

    const validateAdmin = () => {
        let adminPassword = document.getElementById("admin-password");
        let data = {'adminPassword': adminPassword.value};

        const handler = (json) => {
            console.log(json);
            if (json.statusCode === 200) {
                document.getElementById("data-admin-password").value = adminPassword.value;
                navigate('admin');
            }
        };

        post('/admin/login', data, handler);
    }

    const navigate = useNavigate();

    return (
        <div className="Home">
            <input hidden readOnly id="data-search"/>
            <h1>Venue Manager Login</h1>
            <button onClick={() => navigate('createvenue')}>Create A New Venue</button>
            <br></br>
            Venue Name: <input id="venue-name"/>
            Venue Password: <input id="venue-password"/>
            <button onClick={validateVenueManager}>Venue Manager Page</button>
            <h1>Admin Login</h1>
            Admin Password: <input id="admin-password"/>
            <button onClick={validateAdmin}>Admin Page</button>
            <h1>Consumer Actions</h1>
            Show ID: <input id="show-id"/>
            <button onClick={openSeatPage}>Buy Seats</button>
            <h1>Show List</h1>
            Search: <input id="search"/>
            <button onClick={search}>Search</button>
            <div id="show-list"></div>
        </div>
    );
};