import React, { useState } from 'react';
import HomePage from '../pages/HomePage';
import '../pages/styles.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [sortOption, setSortOption] = useState('name');

  const handleSearch = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`); // Update the endpoint to /api/search
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, ${errorText}`);
      }
  
      const data = await response.json();
      setResults(data);
      setError(null);
      setSearched(true);
    } catch (error) {
      console.error('Error during search:', error);
      setError('There was an issue with the search. Please try again.');
    }
  };
  
  

  const handleClearSearch = () => {
    setQuery('');
    setResults([]);
    setError(null);
    setSearched(false);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedResults = results.sort((a, b) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'type') {
      return a.type.localeCompare(b.type);
    } else if (sortOption === 'colour') {
      return a.colour.localeCompare(b.colour);
    }
    return 0;
  });

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
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
      </form>

      {error && <div className="error-message">{error}</div>}

      {!searched && <HomePage />}

      {searched && (
        <div className="search-results">
          <h2>Search Results:</h2>
          <div className="sort-options">
            <label>Sort by:</label>
            <select value={sortOption} onChange={handleSortChange} className="sort-select">
              <option value="name">Name</option>
              <option value="type">Type</option>
              <option value="colour">Colour</option>
            </select>
          </div>
          <ul className="results-list">
            {sortedResults.map((result) => (
              <li key={result._id} className="result-card">
                <strong>{result.name}</strong> - {result.type} - {result.colour}
                <div className="card-image-container">
                  <img src={`http://localhost:4000/${result.imageUrl}`} alt={result.name} className="card-image" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
