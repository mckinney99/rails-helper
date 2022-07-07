import './App.css';
import MainForm from './components/MainForm'
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactGA from 'react-ga';

const TRACKING_ID = "UA-233786806-1";
ReactGA.initialize(TRACKING_ID)

function App() {

  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainForm />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
