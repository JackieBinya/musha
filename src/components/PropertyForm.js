import React, { useState, useRef, useEffect, useContext } from 'react';
import { firebase } from '../firebase';
import { AuthContext } from '../context/auth-context';
import { FirstSection } from './FirstSection';
import { LocationSection } from './LocationSection';
import { PropertyDetailsSection } from './PropertyDetailsSection';
import { UploadImagesSection } from './UploadImagesStep';
import { postAdValidator } from '../helpers';

export const PropertyForm = ({
  title,
  setTitle,
  city,
  setCity,
  location,
  setLocation,
  numberOfBedrooms,
  setNumberOfBedRooms,
  numberOfBathrooms,
  setNumberOfBathrooms,
  availableTo,
  setAvailableTo,
  imageUrls = [],
  setImageUrls,
  mobileNumber,
  setMobileNumber,
  description,
  setDescription,
  isEditing = false,
  persistProperty=null,
  propertyId=''
}) => {
  const {
    currentUser: { uid },
  } = useContext(AuthContext);
  
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');

    if (!availableTo) {
      setError('Specify if the property is for sale or rent!');
      return;
    }

    if (!mobileNumber) {
      setError('Please provide your mobile number!');
      return;
    }

    if (!location) {
      setError('Please provide the location of your property!');
      return;
    }

    if (!city) {
      setError('Please provide the city!');
      return;
    }

    if (!description) {
      setError('Description is required!');
      return;
    }

    if (description.length > 500) {
      setError('The description is too long!');
      return;
    }

    setHasSubmitted(true);
    firebase
      .firestore()
      .collection('properties')
      .add({
        ownerID: uid,
        city,
        location,
        availableTo,
        numberOfBathrooms,
        numberOfBedrooms,
        description,
        imageUrls,
        mobileNumber,
        title,
      })
      .then(function () {
        setTitle('');
        setCity('');
        setDescription('');
        setLocation('');
        setAvailableTo('');
        setNumberOfBedRooms('');
        setNumberOfBathrooms('');
        setImageUrls([]);
        setMobileNumber('');
      })
      .catch((error) => console.log({ error }));
  };

  const handleSave = () => {
      const propertyRef = firebase.firestore().collection("properties").doc(propertyId)

      if(persistProperty.title !== title) {
          propertyRef.update({
              title
          })
          .then(() => console.log('Title successfully updated'))
          .catch((error) => console.log(error))
      }

      if(persistProperty.availableTo !== availableTo) {
        propertyRef.update({
            availableTo
        })
        .then(() => console.log(`Property ID:${propertyId} is successfully updated`))
        .catch((error) => console.log(error))
    }

    if(persistProperty.mobileNumber !== mobileNumber) {
      propertyRef.update({
          mobileNumber
      })
      .then(() => console.log(`Property ID:${propertyId} is successfully updated`))
      .catch((error) => console.log(error))
  }

  if(persistProperty.city!== city) {
    propertyRef.update({
        city
    })
    .then(() => console.log(`Property ID:${propertyId} is successfully updated`))
    .catch((error) => console.log(error))
}

if(persistProperty.location !== location) {
  propertyRef.update({
      location
  })
  .then(() => console.log(`Property ID:${propertyId} is successfully updated`))
  .catch((error) => console.log(error))
}

      if(persistProperty.description !== description) {
        propertyRef.update({
            description
        })
        .then(() => console.log(`Property ID:${propertyId} is successfully updated`))
        .catch((error) => console.log(error))
    }

    if(persistProperty.numberOfBedrooms !== numberOfBedrooms) {
      propertyRef.update({
          numberOfBedrooms
      })
      .then(() => console.log(`Property ID:${propertyId} is successfully updated`))
      .catch((error) => console.log(error))
  }

  if(persistProperty.numberOfBathrooms !== numberOfBathrooms) {
    propertyRef.update({
        numberOfBathrooms
    })
    .then(() => console.log(`Property ID:${propertyId} is successfully updated`))
    .catch((error) => console.log(error))
}
  }
  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="button"onClick={handleSave}>Save</button>
      <form onSubmit={handleSubmit} className="auth-form">
        <FirstSection
          title={title}
          setTitle={setTitle}
          setAvailableTo={setAvailableTo}
          availableTo={availableTo}
          setMobileNumber={setMobileNumber}
          mobileNumber={mobileNumber}
        />

        <LocationSection
          city={city}
          setCity={setCity}
          location={location}
          setLocation={setLocation}
        />

        <UploadImagesSection
          isEditing={isEditing}
          hasSubmitted={hasSubmitted}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />

        <PropertyDetailsSection
          numberOfBathrooms={numberOfBathrooms}
          setNumberOfBathrooms={setNumberOfBathrooms}
          numberOfBedrooms={numberOfBedrooms}
          setNumberOfBedRooms={setNumberOfBedRooms}
          description={description}
          setDescription={setDescription}
        />

        <button type="submit" disabled={isEditing}>Submit</button>
      </form>
    </>
  );
};
