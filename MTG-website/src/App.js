import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Import HomePage
import AddCardPage from './pages/AddCardPage';
import EditCardPage from './pages/EditCardPage';
import BottomTabBar from './components/BottomTabBar';
import './pages/styles.css';

function App() {
  return (
    <Router>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* Render HomePage at root */}
          <Route path="/add-card" element={<AddCardPage />} />
          <Route path="/edit-card/:id" element={<EditCardPage />} />
        </Routes>
      </div>
      <BottomTabBar />
    </Router>
  );
}

export default App;
