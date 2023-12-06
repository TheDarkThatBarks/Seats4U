import { useNavigate } from 'react-router-dom';
import React from 'react';
import { buySeat } from '../controller/BuySeat';
import { listSeats } from '../controller/ListSeats';
import { unlockShow } from '../controller/UnlockShow';

export const BuySeatsPage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{
        listSeats();
        const interval = setInterval(() => {
            validateStillLocked();
            document.getElementById('date-display').innerHTML = getTimeLeft();
        }, 1000);
        return () => clearInterval(interval);
    }, [redraw]);

    const navigate = useNavigate();

    const requestRedraw = () => {
        forceRedraw(redraw + 1);
    };

    const buySeatManager = () => {
        const seats = JSON.parse(document.getElementById("data-seats-list").value);
        const seatID = document.getElementById("seat-id").value;
        let found = false;
        for (let s of seats) {
            found = seatID == s.seatID;
            if (found)
                break;
        }
        if (found)
            buySeat(requestRedraw);
    };

    const backHandler = () => {
        unlockShow();
        navigate(-1);
    }
    const validateStillLocked = () => {
        if(date.getTime() <= Date.now()) {
            backHandler();
        }
    };

    const getTimeLeft = () => {
        var timeLeft = date.getTime() - Date.now();
        let seconds = Math.floor((timeLeft / 1000) % 60);
        let minutes = Math.floor(timeLeft / (1000 * 60));
        let str = '';
        str += minutes + ":";
        if(seconds > 0)
            str += seconds;
        else
            str += "00"
        return str;
    };

    var date = new Date(+Date.now() + 300000);
    const showID = document.getElementById('data-show-id').value;
    const thisShow = JSON.parse(document.getElementById("data-show-list").value).find(x => x.showID == showID);
    
    return (
        <div>
            <input hidden readOnly id="data-seats-list"/>
            <h1>{thisShow.name}</h1>
            <br></br>
            Seat ID: <input id="seat-id"/>
            <button onClick={buySeatManager}>Purchase</button>
            <br></br>
            result: <input id="db-response" readOnly/>
            <br></br>
            Time Left: <label id='date-display'>{getTimeLeft()}</label>
            <br></br>
            <button onClick={backHandler}>Back</button>
            <div id="seats-list"></div>
        </div>
    );
}