import './App.css';

import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { CreateVenuePage } from './pages/CreateVenuePage';

function App() {
  const [redraw, forceRedraw] = React.useState(0);

  React.useEffect(()=>{
  }, [redraw]);

  // this function requests the redraw, and can be passed as an argument to other functions
  const requestRedraw = () => {
    forceRedraw(redraw+1)
  }

  return (
    <div>
      <Routes>
				<Route path="/" element={<CreateVenuePage />} />
			</Routes>
    </div>
  );
}

export default App;
