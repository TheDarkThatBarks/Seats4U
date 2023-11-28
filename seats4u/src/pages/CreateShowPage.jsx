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
                date: <input id="show-date"/>
                time: <input id="show-time"/>
            <button onClick={createShowHandler}>Create</button>
        </div>
    );
}