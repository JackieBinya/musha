import React, { useState, useRef, useEffect, useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
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

  const { url } = useRouteMatch();

  const { register, handleSubmit, watch, errors } = useForm();

  const [imageUrls, setImageUrls] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
        setHasSubmitted(true);
        e.target.reset();
        setImageUrls([]);
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <div>
      <div className={`form-modal-container ${hasSubmitted ? 'show' : 'hide'}`}>
          <p>Congrats! You have successfully created a property ad.</p>
          <button type="button">Go to my properties</button>
      </div>
    <div className={`property-form-container ${hasSubmitted ? 'hide' : 'show'}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-primary">
        <FirstSection register={register} />

        <LocationSection register={register} />

        <UploadImagesSection
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          hasSubmitted={hasSubmitted}
        />

        <PropertyDetailsSection register={register} />

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};
