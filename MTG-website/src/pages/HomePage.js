import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Modal from '../components/modal';
import './styles.css';

function HomePage() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/cards')
      .then(response => response.json())
      .then(data => {
        setCards(data);
        setFilteredCards(data); // Initialize with all cards
      })
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  const handleSearch = (results) => {
    if (results.length === 0) {
      setSearchError('No cards found.');
      setFilteredCards([]); // Show no cards
    } else {
      setSearchError(null);
      setFilteredCards(results); // Update with search results
    }
  };

  const handleSort = (sortOption) => {
    const sorted = [...filteredCards].sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'type') {
        return a.type.localeCompare(b.type);
      } else if (sortOption === 'colour') {
        return a.colour.localeCompare(b.colour);
      }
      return 0;
    });
    setFilteredCards(sorted);
  };

  const resetCards = () => {
    setSearchError(null);
    setFilteredCards(cards); // Reset to all cards
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cards/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedCards = cards.filter(card => card._id !== id);
        setCards(updatedCards);
        setFilteredCards(updatedCards);
      } else {
        console.error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleDeleteAll = () => {
    setShowModal(true); // Show the custom modal
  };

  const confirmDeleteAll = () => {
    setShowModal(false); // Hide the modal
    fetch('http://localhost:4000/api/cards', {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCards([]);
          setFilteredCards([]);
        } else {
          console.error('Failed to delete all cards');
        }
      })
      .catch(error => console.error('Error deleting all cards:', error));
  };

  return (
    <div className="container">
      <h1 className="page-title">Magic: The Gathering - Card Collection</h1>
      <SearchBar onSearch={handleSearch} onSort={handleSort} resetCards={resetCards} />

      {searchError ? (
        <p className="no-cards-message">{searchError}</p>
      ) : (
        filteredCards.length === 0 && <p className="no-cards-message">No cards available.</p>
      )}

      {filteredCards.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={handleDeleteAll} 
            className="delete-all-button"
          >
            Delete All Cards
          </button>
        </div>
      )}

      <div className="cards-grid">
        {filteredCards.length > 0 ? (
          filteredCards.map(card => (
            <div key={card._id} className="card">
              <h2>{card.name}</h2>
              <p>Type: {card.type}</p>
              <p>Colour: {card.colour}</p>
              {card.imageUrl && (
                <img 
                  src={`http://localhost:4000/${card.imageUrl}`} 
                  alt={card.name} 
                  className="card-image"
                />
              )}
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => navigate(`/edit-card/${card._id}`)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(card._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          null
        )}
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDeleteAll}
        title="Delete All Cards"
        message="Are you sure you want to delete all cards? This action cannot be undone."
      />
    </div>
  );
}

export default HomePage;
