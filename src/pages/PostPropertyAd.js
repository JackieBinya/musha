import React, { useState } from 'react';
import { PropertyForm } from '../components/PropertyForm';

export const PostPropertyAd = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfBedrooms, setNumberOfBedRooms] = useState('studio');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('1');
  const [description, setDescription] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  return (
    <>
      <h1>Create a property ad</h1>

      <h2>Fill in the form below as accurately as possible.</h2>

      <PropertyForm
        title={title}
        setTitle={setTitle}
        mobileNumber={mobileNumber}
        setMobileNumber={setMobileNumber}
        description={description}
        setDescription={setDescription}
        city={city}
        setCity={setCity}
        location={location}
        setLocation={setLocation}
        numberOfBedrooms={numberOfBedrooms}
        setNumberOfBedRooms={setNumberOfBedRooms}
        numberOfBathrooms={numberOfBathrooms}
        setNumberOfBathrooms={setNumberOfBathrooms}
        availableTo={availableTo}
        setAvailableTo={setAvailableTo}
        imageUrls={imageUrls}
        setImageUrls={setImageUrls}
      />
    </>
  );
};
