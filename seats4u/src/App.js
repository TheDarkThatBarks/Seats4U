import './App.css';

import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { Home } from './Pages/Home.jsx';
import { CreateVenuePage } from './Pages/CreateVenuePage.jsx';
import { CreateShowPage } from './Pages/CreateShowPage.jsx';
import { ListShowsPage } from './Pages/ListShowsPage.jsx';

function App() {
    return (
        <div className="Seats4U">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/CreateVenuePage" element={<CreateVenuePage />} />
                <Route path="/CreateShowPage" element={<CreateShowPage />} />
                <Route path="/ListShowsPage" element={<ListShowsPage />} />
            </Routes>
        </div>
    );
}

export default App;