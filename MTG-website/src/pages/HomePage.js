import React, { useEffect, useState } from 'react';
import '../pages/styles.css';

function HomePage({ searched }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/cards')
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  if (searched) {
    return null;
  }

  return (
    <div className="container">
      <h1>Magic: The Gathering - Card Collection</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cards.length > 0 ? (
          cards.map(card => (
            <div key={card._id} className="card">
              <h2>{card.name}</h2>
              <p>Type: {card.type}</p>
              <p>Colour: {card.colour}</p>
              {card.imageUrl && (
                <img src={`/${card.imageUrl}`} alt={card.name} />
              )}
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
