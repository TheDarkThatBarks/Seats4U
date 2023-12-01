import React from 'react';
import { useNavigate } from 'react-router-dom';
import { listShows } from '../controller/ListShows';
import { post } from '../controller/API';

export const Home = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(() => {
        listShows();
    }, [redraw]);

    const requestRedraw = () => {
        forceRedraw(redraw + 1);
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

    const navigate = useNavigate();

    return (
        <div className="Home">
            <button onClick={() => navigate('createvenue')}>Create Venue</button>
            Venue Name: <input id="venue-name" />
            Venue Password: <input id="venue-password" />
            <button onClick={validateVenueManager}>Venue Manager Page</button>
            <button onClick={() => navigate('admin')}>Admin Page</button>
            <div id="show-list"></div>
        </div>
    );
};