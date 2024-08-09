import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';
import Topics from './Pages/Topics';
import './App.css';
import TestPage from './Pages/Test';
import Result from './Pages/Result';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
