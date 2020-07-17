import React, { useState, useRef, useEffect, useContext } from 'react';
import { firebase } from '../firebase';
import { AuthContext } from '../context/auth-context';
import { useForm } from "react-hook-form";
import { FirstSection } from '../components/FirstSection';
import { LocationSection } from '../components/LocationSection';
import { PropertyDetailsSection } from '../components/PropertyDetailsSection';
import { UploadImagesSection } from '../components/UploadImagesStep';

export const PostPropertyAdForm = () => {
  const {
    currentUser: { uid },
  } = useContext(AuthContext);

  // const { register, handleSubmit } = useForm();

  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfBedrooms, setNumberOfBedRooms] = useState('studio');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('1');
  const [description, setDescription] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
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

  return (
    <>
      <h1>Create a property ad</h1>

      <h2>Fill in the form below as accurately as possible.</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <FirstSection
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

        <button type="submit" disabled={hasSubmitted ? true : false}>
          Submit
        </button>
      </form>
    </>
  );
};
