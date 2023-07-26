import './App.css';
import Home from './pages/Home'
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-YDPGVFCXQS";
ReactGA.initialize(TRACKING_ID)

function App() {

  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
