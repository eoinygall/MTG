import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditCardPage() {
  const { id } = useParams(); // Retrieving the ID from URL
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/cards/${id}`)
      .then(res => res.json())
      .then(data => setCard(data))
      .catch(err => console.error("Error loading the card data:", err));
  }, [id]);

  if (!card) {
    return <div>Loading...</div>; // Show loading state or check for errors
  }

  // Form to edit the card
  return (
    <div>
        <h1>Edit Card</h1>
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" name="name" value={cardDetails.name || ''} onChange={handleChange} required />
            </label>
            <label>Type:
                <input type="text" name="type" value={cardDetails.type || ''} onChange={handleChange} required />
            </label>
            <label>Colour:
                <input type="text" name="colour" value={cardDetails.colour || ''} onChange={handleChange} required />
            </label>
            <label>Image URL:
                <input type="text" name="imageUrl" value={cardDetails.imageUrl || ''} onChange={handleChange} />
            </label>
            <button type="submit">Update Card</button>
        </form>
    </div>
);
}


export default EditCardPage;
