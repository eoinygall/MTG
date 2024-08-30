import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

function EditCardPage() {
  const { id } = useParams();  // Extract the card ID from the URL
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState(null);  // State to hold the card details
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to track errors

  useEffect(() => {
    // Fetch the card details by ID
    fetch(`http://localhost:4000/api/cards/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch card details');
        }
        return response.json();
      })
      .then(data => {
        setCardDetails(data);  // Set the card details in state
        setLoading(false);  // Set loading to false after data is received
      })
      .catch(error => {
        console.error('Error fetching card details:', error);
        setError('Failed to load card details.');
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    setCardDetails({
      ...cardDetails,
      image: event.target.files[0]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', cardDetails.name);
    formData.append('type', cardDetails.type);
    formData.append('colour', cardDetails.colour);
    if (cardDetails.image) {
      formData.append('image', cardDetails.image);
    }

    try {
      const response = await fetch(`http://localhost:4000/api/cards/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        navigate('/');  // Redirect to homepage after successful edit
      } else {
        throw new Error('Failed to update card');
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  if (loading) {
    return <p>Loading card details...</p>;  // Display loading message
  }

  if (error) {
    return <p>{error}</p>;  // Display error message if there was an issue loading the card
  }

  return (
    <div className="edit-card-container">
      <h1>Edit Card Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={cardDetails.name || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={cardDetails.type || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Colour:</label>
          <input
            type="text"
            name="colour"
            value={cardDetails.colour || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCardPage;
