import React, { useState, useRef, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { firebase } from '../firebase';
import { AuthContext } from '../context/auth-context';
import { UploadImagesSection } from './UploadImagesStep';
import { FirstSection } from './FirstSection';
import { LocationSection } from './LocationSection';
import { PropertyDetailsSection } from './PropertyDetailsSection';

export const PropertyForm = () => {
  const {
    currentUser: { uid },
  } = useContext(AuthContext);

  const { register, handleSubmit, watch, errors } = useForm();

  const [imageUrls, setImageUrls] = useState([]);

  const onSubmit = (
    {
      city,
      location,
      availableTo,
      numberOfBathrooms,
      numberOfBedrooms,
      description,
      mobileNumber,
      title,
    },
    e
  ) => {
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
        e.target.reset();
        setImageUrls([]);
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <div className="property-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="form-primary">
        <FirstSection register={register} />

        <LocationSection register={register} />

        <UploadImagesSection
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
        />

        <PropertyDetailsSection register={register} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
