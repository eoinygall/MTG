import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCardPage from './pages/AddCardPage';
import EditCardPage from './pages/EditCardPage';  // Import the EditCardPage
import SearchBar from './components/searchBar';
import BottomTabBar from './components/BottomTabBar';
import '../src/pages/styles.css';

function App() {
  return (
    <Router>
      <div className="page-content">
        <Routes>
          <Route path="/" element={<SearchBar />} />  {/* Render SearchBar which handles HomePage */}
          <Route path="/add-card" element={<AddCardPage />} />
          <Route path="/edit-card/:id" element={<EditCardPage />} />  {/* Add the edit route */}
        </Routes>
      </div>
      
      <BottomTabBar /> {/* This places the BottomTabBar at the bottom of every page */}
    </Router>
  );
}

export default App;
