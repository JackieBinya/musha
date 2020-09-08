import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { firebase } from '../firebase';
import { yupResolver } from '@hookform/resolvers';

import { AuthContext } from '../context/auth-context';
import { UploadImagesSection } from '../components/UploadImagesSection';
import { FirstSection } from '../components/FirstSection';
import { LocationSection } from '../components/LocationSection';
import { PropertyDetailsSection } from '../components/PropertyDetailsSection';
import { PROPERTY_SCHEMA } from '../constants/validations';
import { Footer } from '../components/Footer';

export const PostPropertyAd = ({ history }) => {
  const {
    currentUser: { uid },
  } = useContext(AuthContext);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(PROPERTY_SCHEMA),
  });

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
        // e.target.reset();
        setImageUrls([]);
      })
      .catch((error) => console.log({ error }));
  };

  return (
    <>
      <main className="container">
        <div className="container-inner">
          <div
            data-testid="alert-message"
            className={`form-modal-container ${hasSubmitted ? 'show' : 'hide'}`}
          >
            <p>Congrats! You have successfully created a property ad.</p>
            <button type="button" onClick={() => history.goBack()}>
              Go to my properties
            </button>
          </div>

          <div className={hasSubmitted ? 'hide' : 'show'}>
            <h1>Create a property ad</h1>

            <h2>Fill in the form below as accurately as possible.</h2>

            <div className="property-form-container">
              <form onSubmit={handleSubmit(onSubmit)} className="form-primary">
                <FirstSection register={register} errors={errors} />

                <LocationSection register={register} errors={errors} />

                <UploadImagesSection
                  imageUrls={imageUrls}
                  setImageUrls={setImageUrls}
                  hasSubmitted={hasSubmitted}
                />

                <PropertyDetailsSection register={register} errors={errors} />

                <button data-testid="submit-action" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
