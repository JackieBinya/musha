import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { firebase } from '../firebase';
import { useProperty } from '../hooks';
import { UploadImagesSection } from '../components/UploadImagesStep';
import { FirstSection } from '../components/FirstSection';
import { LocationSection } from '../components/LocationSection';
import { Loader } from '../components/Loader';
import { PropertyDetailsSection } from '../components/PropertyDetailsSection';

export const EditPropertyAds = ({ history }) => {
  const { propertyId } = useParams();
  const { property } = useProperty(propertyId);

  const { register, handleSubmit, watch, errors } = useForm();

  const [isTitleUpdated, setIsTitleUpdated] = useState(false);
  const [isMobileNumberUpdated, setIsMobileNumberUpdated] = useState(false);
  const [isAvailableToUpdated, setIsAvailableToUpdated] = useState(false);
  const [isCityUpdated, setIsCityUpdated] = useState(false);
  const [isLocationUpdated, setIsLocationUpdated] = useState(false);
  const [isNumberOfBathroomsUpdated, setIsNumberOfBathroomsUpdated] = useState(
    false
  );
  const [isNumberOfBedroomsUpdated, setIsNumberOfBedroomsUpdated] = useState(
    false
  );
  const [isDescriptionUpdated, setIsDescriptionUpdated] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

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
    const propertyRef = firebase
      .firestore()
      .collection('properties')
      .doc(propertyId);

    if (property.title !== title) {
      propertyRef
        .update({
          title,
        })
        .then(() => setIsTitleUpdated(true))
        .catch((error) => console.log(error));
    }

    if (property.availableTo !== availableTo) {
      propertyRef
        .update({
          availableTo,
        })
        .then(() => setIsAvailableToUpdated(true))
        .catch((error) => console.log(error));
    }

    if (property.mobileNumber !== mobileNumber) {
      propertyRef
        .update({
          mobileNumber,
        })
        .then(() => setIsMobileNumberUpdated(true))
        .catch((error) => console.log(error));
    }

    if (property.city !== city) {
      propertyRef
        .update({
          city,
        })
        .then(() => setIsCityUpdated(true))
        .catch((error) => console.log(error));
    }

    if (property.location !== location) {
      propertyRef
        .update({
          location,
        })
        .then(() => setIsLocationUpdated(true))
        .catch((error) => console.log(error));
    }

    if (property.description !== description) {
      propertyRef
        .update({
          description,
        })
        .then(() => setIsDescriptionUpdated(true))
        .catch((error) => console.log(error));
    }

    if (property.numberOfBedrooms !== numberOfBedrooms) {
      propertyRef
        .update({
          numberOfBedrooms,
        })
        .then(() => setIsNumberOfBedroomsUpdated(true))
        .catch((error) => console.log(error));
    }

    if (property.numberOfBathrooms !== numberOfBathrooms) {
      propertyRef
        .update({
          numberOfBathrooms,
        })
        .then(() => setIsNumberOfBathroomsUpdated(true))
        .catch((error) => console.log(error));
    }

    e.target.reset();
  };

  useEffect(() => {
    if (
      isTitleUpdated ||
      isMobileNumberUpdated ||
      isAvailableToUpdated ||
      isCityUpdated ||
      isLocationUpdated ||
      isNumberOfBathroomsUpdated ||
      isNumberOfBedroomsUpdated ||
      isDescriptionUpdated
    ) {
      console.log({ isTitleUpdated });
      setIsModalVisible(true);

      setIsTitleUpdated(false);
      setIsAvailableToUpdated(false);
      setIsMobileNumberUpdated(false);
      setIsCityUpdated(false);
      setIsLocationUpdated(false);
      setIsNumberOfBathroomsUpdated(false);
      setIsNumberOfBedroomsUpdated(false);
      setIsDescriptionUpdated(false);
    }
  }, [
    isTitleUpdated,
    isAvailableToUpdated,
    isCityUpdated,
    isLocationUpdated,
    isMobileNumberUpdated,
    isDescriptionUpdated,
    isNumberOfBathroomsUpdated,
    isNumberOfBedroomsUpdated,
  ]);

  return (
    <div style={{ marginBottom: '2em' }}>
      {property && isModalVisible && (
        <div className="form-modal-container">
          <p
            className={isModalVisible ? 'show' : 'hide'}
          >{`Property ID:${propertyId} is successfully updated`}</p>
          <button type="button" onClick={() => history.goBack()}>
            {' '}
            Go to my properties
          </button>
        </div>
      )}
      <div className="property-form-container">
        {!property ? (
          <Loader />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`form-primary ${isModalVisible ? 'hide' : 'show'}`}
          >
            <FirstSection
              defaultMobileNumber={property.mobileNumber}
              defaultTitle={property.title}
              defaultAvailableTo={property.availableTo}
              register={register}
            />

            <LocationSection
              defaultCity={property.city}
              defaultLocation={property.location}
              register={register}
            />

            {/* <UploadImagesSection
                  defaultImageUrls={property.imageUrls}
                  setImageUrls={setImageUrls}
                /> */}

            <PropertyDetailsSection
              defaultNumberOfBathrooms={property.numberOfBathrooms}
              defaultNumberOfBedrooms={property.numberOfBedrooms}
              defaultDescription={property.description}
              register={register}
            />

            <button type="submit">Save</button>
          </form>
        )}
      </div>
    </div>
  );
};
