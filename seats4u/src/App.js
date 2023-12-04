import './App.css';

import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Home } from './Pages/Home.jsx';
import { CreateVenuePage } from './Pages/CreateVenuePage.jsx';
import { CreateShowPage } from './Pages/CreateShowPage.jsx';
import { AdminPage } from './Pages/AdminPage.jsx';
import { VenueManagerPage } from './Pages/VenueManagerPage.jsx';
import { BuySeatsPage } from './Pages/BuySeatsPage.jsx';

//import { Venue, Show } from './model/Model.js'

function App() {
    //let v = new Venue("test", 123, "password1");
    return (
        <div className="Seats4U">
            <input readOnly id="data-venue-name" value=""/>
            <input readOnly id="data-venue-id" value=""/>
            <input readOnly id="data-venue-password" value=""/>
            <input readOnly id="data-admin-password" value=""/>
            <input readOnly id="data-show-id" value=""/>
            <input readOnly id="data-show-list" value=""/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/createvenue" element={<CreateVenuePage/>}/>
                <Route path="/venuemanager/createshow" element={<CreateShowPage/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/venuemanager" element={<VenueManagerPage/>}/>
                <Route path="/buyseats" element={<BuySeatsPage/>}/>
            </Routes>
        </div>
    );
}

export default App;