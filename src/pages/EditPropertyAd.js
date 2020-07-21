import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firebase } from '../firebase';
import { useProperty } from '../hooks';

import { PropertyForm } from '../components/PropertyForm';
import { Loader } from '../components/Loader';

let persistProperty;

export const EditPropertyAds = () => {
  const { propertyId } = useParams();
  const { property } = useProperty(propertyId);
  const [isEditing, setIsEditing] = useState(true);

  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfBedrooms, setNumberOfBedRooms] = useState('studio');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('1');
  const [description, setDescription] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (property) {
      const {
        title,
        city,
        location,
        numberOfBedrooms,
        numberOfBathrooms,
        description,
        mobileNumber,
        availableTo,
        imageUrls,
      } = property;

      persistProperty = {
          title,
          city,
          location,
          numberOfBedrooms,
          numberOfBathrooms,
          description,
          mobileNumber,
          availableTo,
          imageUrls
      }
      setTitle(title);
      setCity(city);
      setLocation(location);
      setNumberOfBathrooms(numberOfBathrooms);
      setNumberOfBedRooms(numberOfBedrooms);
      setDescription(description);
      setMobileNumber(mobileNumber);
      setAvailableTo(availableTo);
      setImageUrls([...imageUrls]);
    }
  }, [property]);

  return (
    <>
      {!property ? (
        <Loader />
      ) : (
        <PropertyForm
          isEditing={isEditing}
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
          persistProperty={persistProperty}
          propertyId={propertyId}
        />
      )}
    </>
  );
};
