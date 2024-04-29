import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';


function AddCardPage() {
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState({
    name: '',
    type: '',
    colour: '',
    image: null,
    imagePreviewUrl: ''  // Stores the URL for the image preview
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
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = new FormData();
    formData.append('name', cardDetails.name);
    formData.append('type', cardDetails.type);
    formData.append('colour', cardDetails.colour);
    if (cardDetails.image) {
        formData.append('image', cardDetails.image);
    }

    try {
        const response = await fetch('http://localhost:5000/cards', {
            method: 'POST',
            body: formData // FormData will correctly handle the image
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Card added successfully:', result);
            navigate('/'); // Redirect to the homepage after successful upload
        } else {
            const error = await response.text(); // Gets text from the response body that includes the error message
            throw new Error('Failed to add card: ' + error);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
    }
};

  return (
    <div className="add-card-container">
      <h1>Add Card Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={cardDetails.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={cardDetails.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Colour:</label>
          <input
            type="text"
            name="colour"
            value={cardDetails.colour}
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
          {cardDetails.imagePreviewUrl && (
            <img src={cardDetails.imagePreviewUrl} alt="Preview" className="image-preview" />
          )}
        </div>
        <button type="submit">Add Card</button>
      </form>
    </div>
  );
}

export default AddCardPage;
