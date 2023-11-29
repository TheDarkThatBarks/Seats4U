import { useNavigate } from 'react-router-dom';
import React from 'react';
import { createVenue } from '../controller/CreateVenue';

export const AdminPage = () => {
    const [redraw, forceRedraw] = React.useState(0);

    React.useEffect(()=>{}, [redraw]);

    const navigate = useNavigate();

    const requestRedraw = () => {
        forceRedraw(redraw+1);
    }
    
    return (
        <div>
        </div>
    );
}