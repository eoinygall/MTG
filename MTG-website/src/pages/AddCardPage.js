import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

function AddCardPage() {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    name: '',
    type: '',
    colour: '',
    image: null,
    imagePreviewUrl: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCardDetails({
      ...cardDetails,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader();
    
    reader.onloadend = () => {
      setCardDetails({
        ...cardDetails,
        image: file,
        imagePreviewUrl: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setCardDetails({
        ...cardDetails,
        image: null,
        imagePreviewUrl: ""
      });
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
      const response = await fetch('http://localhost:4000/api/cards', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Card added successfully:', result);
        navigate('/');
      } else {
        const errorText = await response.text();
        throw new Error('Failed to add card: ' + errorText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="add-card-container">
      <h1>Add Card Details</h1>
      <form onSubmit={handleSubmit} className="add-card-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={cardDetails.type}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Colour:</label>
          <input
            type="text"
            name="colour"
            value={cardDetails.colour}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-input-file"
          />
          {cardDetails.imagePreviewUrl && (
            <img src={cardDetails.imagePreviewUrl} alt="Preview" className="image-preview" />
          )}
        </div>
        <button type="submit" className="form-button">Add Card</button>
      </form>
    </div>
  );
}

export default AddCardPage;
