import React, { useState } from 'react';
import '../pages/styles.css';

function SearchBar({ onSearch, onSort, resetCards }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [sortOption, setSortOption] = useState('name');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }

      const data = await response.json();
      if (data.length === 0) {
        onSearch([]);  // Pass empty results to HomePage
      } else {
        setError(null);
        onSearch(data);  // Pass search results to HomePage
      }
      setSearched(true);
    } catch (error) {
      console.error('Error during search:', error);
      setError('There was an issue with the search. Please try again.');
      onSearch([]);  // Clear results on error
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setError(null);
    setSearched(false);
    resetCards();  // Reset the homepage cards when search is cleared
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setMenuOpen(false);
    onSort(e.target.value);  // Pass sort option to HomePage
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or type..."
            required
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
          {searched && (
            <button type="button" onClick={handleClearSearch} className="clear-button">
              Clear Search
            </button>
          )}
          <div className="hamburger-menu">
            <button type="button" onClick={toggleMenu} className="menu-button">☰</button>
            <div className={`menu-dropdown ${menuOpen ? 'open' : ''}`}>
              <label className="menu-label">Sort by:</label>
              <select value={sortOption} onChange={handleSortChange} className="sort-select">
                <option value="name">Name</option>
                <option value="type">Type</option>
                <option value="colour">Colour</option>
              </select>
            </div>
          </div>
        </div>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default SearchBar;
