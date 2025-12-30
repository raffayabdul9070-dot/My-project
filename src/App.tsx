import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Gallery from './pages/gallery';
import Login from './pages/login';
import Survey from './pages/Survey';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar - Shows after Login */}
        {isAuthenticated && (
          <nav className="glass-nav">
            <div className="nav-content">
              
              <ul className="nav-links">
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/about">ABOUT</Link></li>
                <li><Link to="/gallery">GALLERY</Link></li>
                <li><Link to="/survey" className="survey-link">SURVEY</Link></li>
                <li><button onClick={() => setIsAuthenticated(false)} className="logout-pill">LOGOUT</button></li>
              </ul>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/about" element={isAuthenticated ? <About /> : <Navigate to="/login" />} />
          <Route path="/gallery" element={isAuthenticated ? <Gallery /> : <Navigate to="/login" />} />
          <Route path="/survey" element={isAuthenticated ? <Survey /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;