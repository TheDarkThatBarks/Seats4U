import { useNavigate } from 'react-router-dom';
import React from 'react';
import { buySeat } from '../controller/BuySeat';
//import { listSeats } from '../controller/ListSeats';
import { unlockShow } from '../controller/UnlockShow';

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

    const backHandler = () => {
        unlockShow();
        navigate(-1);
    }
    
    return (
        <div>
            <h1>{document.getElementById("data-show-id").value}</h1>
            <br></br>
            Seat ID: <input id="venue-name"/>
            <button onClick={buySeatManager}>Purchase</button>
            <br></br>
            result: <input id="db-response" readOnly/>
            <br></br>
            Locked Until: {new Date()[Symbol.toPrimitive]('string')}
            <br></br>
            <button onClick={backHandler}>Back</button>
            <div id="seat-list"></div>
        </div>
    );
}