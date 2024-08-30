import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './styles.css';

function HomePage() {
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();  // Hook to navigate to other pages

  useEffect(() => {
    // Fetch the card data from the backend server
    fetch('http://localhost:4000/api/cards')
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cards/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCards(cards.filter(card => card._id !== id));  // Remove the deleted card from the state
        console.log('Card deleted successfully');
      } else {
        console.error('Failed to delete card');
      }
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-card/${id}`);  // Navigate to the edit page with the card ID
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete all cards? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      const response = await fetch('http://localhost:4000/api/cards', {
        method: 'DELETE',
      });
      if (response.ok) {
        setCards([]);  // Clear the cards state
        console.log('All cards deleted successfully');
      } else {
        console.error('Failed to delete all cards');
      }
    } catch (error) {
      console.error('Error deleting all cards:', error);
    }
  };

  return (
    <div className="container">
      <h1>Magic: The Gathering - Card Collection</h1>
      <button 
        onClick={handleDeleteAll} 
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          cursor: 'pointer',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
        }}
      >
        Delete All Cards
      </button>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card._id} className="card">
              <h2>{card.name}</h2>
              <p>Type: {card.type}</p>
              <p>Colour: {card.colour}</p>
              {card.imageUrl && (
                <img 
                  src={`http://localhost:4000/${card.imageUrl}`}  // Ensure the correct port and path are used
                  alt={card.name} 
                />
              )}
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => handleEdit(card._id)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(card._id)}
                  style={{
                    padding: '5px 10px',
                    fontSize: '14px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
