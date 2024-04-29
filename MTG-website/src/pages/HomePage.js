import React, { useEffect, useState } from 'react';

function HomePage() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/cards')
      .then(response => response.json())
      .then(data => {
        setCards(data);
      })
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/cards/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setCards(prevCards => prevCards.filter(card => card._id !== id));
          console.log('Card deleted successfully');
        } else {
          console.error('Failed to delete card');
        }
      })
      .catch(error => console.error('Error deleting card:', error));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cards.map(card => (
          <div key={card._id} style={{ margin: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h2>{card.name}</h2>
            <p>Type: {card.type}</p>
            <p>Colour: {card.colour}</p>
            {card.imageUrl && (
              <img src={card.imageUrl} alt={card.name} style={{ width: '200px', height: 'auto' }} />
            )}
            <button onClick={() => handleDelete(card._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
