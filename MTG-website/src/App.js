import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddCardPage from './pages/AddCardPage';
import NavBar from './components/NavBar';
import BottomTabBar from './components/BottomTabBar';
import './styles.css';

function App() {
  return (
    <Router>
      <NavBar /> {/* This places the NavBar at the top of every page within the Router */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-card" element={<AddCardPage />} />
        </Routes>
      </div>
      
      <BottomTabBar /> {/* This places the BottomTabBar at the bottom of every page */}
    </Router>
  );
}

export default App;
