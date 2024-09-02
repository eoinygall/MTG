import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';

function EditCardPage() {
  const { id } = useParams();  // Extract the card ID from the URL
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState(null);  // State to hold the card details
  const [loading, setLoading] = useState(true);  // State to track loading status
  const [error, setError] = useState(null);  // State to track errors
  const [imagePreview, setImagePreview] = useState(''); // State to store the image preview URL

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
        setImagePreview(`http://localhost:4000/${data.imageUrl}`); // Set the existing image URL as the preview
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
    const file = event.target.files[0];
    setCardDetails({
      ...cardDetails,
      image: file
    });

    // Generate a preview of the image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview('');
    }
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
      <form onSubmit={handleSubmit} className="edit-card-form">
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
            value={cardDetails.name || ''}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Type:</label>
          <input
            type="text"
            name="type"
            value={cardDetails.type || ''}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Colour:</label>
          <input
            type="text"
            name="colour"
            value={cardDetails.colour || ''}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-input-file"
          />
        </div>
        {imagePreview && (
           <div className="image-preview-container">
            <img src={imagePreview} alt={cardDetails.name || 'Card Preview'} className="image-preview" />
             </div>
            )}
        <button type="submit" className="form-button">Save Changes</button>
      </form>
    </div>
  );
}

export default EditCardPage;
