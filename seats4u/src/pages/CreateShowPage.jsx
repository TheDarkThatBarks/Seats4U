import { useNavigate } from 'react-router-dom';
import React from 'react'
import { createShow } from '../controller/CreateShow';

export const CreateShowPage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{}, [redraw]);

    const navigate = useNavigate();

    const createShowHandler = (e) => {
        createShow(requestRedraw)
    }

    const requestRedraw = () => {
        forceRedraw(redraw+1)
    }

    return (
        <div className="Seats4U">
            <h1>inputs</h1>
                Venue Name: <input id="venue-name"/>
                Show Name: <input id="show-name"/>
                Price: <input id="show-price"/>
                Show Month: <input id="show-month"/>
                Show Day: <input id="show-day"/>
                Show Year: <input id="show-year"/>
                Show Hour: <input id="show-hour"/>
                Show Minute: <input id="show-minute"/>
                Venue Password: <input id="venue-password"/>
            <button onClick={createShowHandler}>Create</button>
            Result: <input id="db-response" readOnly/>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    );
}