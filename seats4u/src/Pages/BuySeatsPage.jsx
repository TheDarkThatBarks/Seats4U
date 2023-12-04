import { useNavigate } from 'react-router-dom';
import React from 'react';
import { buySeat } from '../controller/BuySeat';
//import { listSeats } from '../controller/ListSeats';

export const BuySeatsPage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{
        //listSeats(document.getElementById("data-show-id").value);
    }, [redraw]);

    const navigate = useNavigate();

    const requestRedraw = () => {
        forceRedraw(redraw + 1);
    };

    const buySeatManager = () => {
        buySeat(requestRedraw);
    };
    
    return (
        <div>
            <h1>{document.getElementById("data-show-name").value}</h1>
            <br></br>
            Seat ID: <input id="venue-name"/>
            <button onClick={buySeatManager}>Delete</button>
            <br></br>
            result: <input id="db-response" readOnly/>
            <br></br>
            <button onClick={() => navigate(-1)}>Back</button>
            <div id="seat-list"></div>
        </div>
    );
}