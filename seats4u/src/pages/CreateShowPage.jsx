//import { Link } from 'react-router-dom';
import React from 'react'
import { createShow } from '../controller/CreateShow';

export const CreateShowPage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{}, [redraw]);

    const createShowHandler = (e) => {
        createShow(requestRedraw)
    }

    const requestRedraw = () => {
        forceRedraw(redraw+1)
    }

    return (
        <div className="Seats4U">
            <h1>inputs</h1>
                name: <input id="show-name"/>
                price: <input id="show-price"/>
                month: <input id="show-month"/>
                day: <input id="show-day"/>
                year: <input id="show-year"/>
                hour: <input id="show-hour"/>
                minute: <input id="show-minute"/>
            <button onClick={createShowHandler}>Create</button>
        </div>
    );
}