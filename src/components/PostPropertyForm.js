import React, { useState } from 'react';

export const PostPropertyForm = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfBedrooms, setNumberOfBedRooms] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  return (
    <>
    <h1>Create a property listing</h1>
      <form>
        <div>
          <label htmlFor="image">Upload an image of your property</label>
          <input type="file" name="image" />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={city} />
        </div>

        <div>
          <label htmlFor="location">Location/Suburb</label>
          <input type="text" name="location" value={location}/>
        </div>

        <div>
          <label htmlFor="location">Bed Sitter</label>
          <input type="radio" name="bed-sitter" value={location}/>
        </div>

        <div>
          <label htmlFor="one-bedroom">1 bedroom</label>
          <input type="radio" name="one-bedroom" value={location}/>
        </div>

        <div>
          <label htmlFor="two-bedrooms">2bedroom</label>
          <input type="radio" name="two-bedrooms" value={location} />
        </div>

        <div>
          <label htmlFor="three-bedrooms-and-more">3 or more bedrooms</label>
          <input type="radio" name="three-bedrooms-and-more" value={location}/>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" rows="8"  value={description}/>
        </div>

        <div>
          <label htmlFor="mobile-number">Mobile Number</label>
          <input type="text" name="mobile-number" value={mobileNumber} />
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};
