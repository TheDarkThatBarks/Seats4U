import { useNavigate } from 'react-router-dom';
import React from 'react';
import { listVenues } from '../controller/ListVenues';

export const AdminPage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{
        //listVenues(requestRedraw)
    }, [redraw]);

    const navigate = useNavigate();

    const requestRedraw = () => {
        forceRedraw(redraw+1);
    }

    const listVenuesHandler = (e) => {
        listVenues()
        requestRedraw()
    }
    
    return (
        <div>
            Admin Password: <input id="admin-pass"/>
            <button onClick={listVenuesHandler}>List Venues</button>
            result: <input id="db-response" readOnly/>
            <button onClick={() => navigate(-1)}>Back</button>
            <div id="venue-list"></div>
        </div>
    );
}