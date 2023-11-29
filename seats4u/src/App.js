import './App.css';

import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Home } from './Pages/Home.jsx';
import { CreateVenuePage } from './Pages/CreateVenuePage.jsx';
import { CreateShowPage } from './Pages/CreateShowPage.jsx';
import { AdminPage } from './Pages/AdminPage.jsx';
import { VenueManagerPage } from './Pages/VenueManagerPage.jsx';

function App() {
    return (
        <div className="Seats4U">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/venuemanager/createvenue" element={<CreateVenuePage />} />
                <Route path="/createshow" element={<CreateShowPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/venuemanager" element={<VenueManagerPage />} />
            </Routes>
        </div>
    );
}

export default App;