import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { firebase } from '../firebase';
import { yupResolver } from '@hookform/resolvers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import { useProperty } from '../hooks';
import { FirstSection } from '../components/FirstSection';
import { LocationSection } from '../components/LocationSection';
import { Loader } from '../components/Loader';
import { PropertyDetailsSection } from '../components/PropertyDetailsSection';
import { PROPERTY_SCHEMA } from '../constants/validations';

export const EditPropertyAds = ({ history }) => {
  const { propertyId } = useParams();
  const { property } = useProperty(propertyId);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(PROPERTY_SCHEMA),
  });

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
    <div className="container">
      <div style={{ marginBottom: '2em' }}>
        {property && isModalVisible && (
          <div className="form-modal-container">
            <p
              className={isModalVisible ? 'show' : 'hide'}
            >{`Property ID:${propertyId} is successfully updated`}</p>
            <button
              data-testid="go-to-my-properties-action"
              type="button"
              onClick={() => history.goBack()}
            >
              {' '}
              Go to my properties
            </button>
          </div>
        )}
        <div className="property-form-container">
          {!property ? (
            <Loader />
          ) : (
            <div
              data-testid="edit-form"
              className={isModalVisible ? 'hide' : 'show'}
            >
              <button
                data-testid="back-button"
                type="button"
                onClick={() => history.goBack()}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="property-icons-svg"
                />
                Back
              </button>

              <h1>Edit property ad</h1>

              <form onSubmit={handleSubmit(onSubmit)} className="form-primary">
                <FirstSection
                  defaultMobileNumber={property.mobileNumber}
                  defaultTitle={property.title}
                  defaultAvailableTo={property.availableTo}
                  register={register}
                  errors={errors}
                />

                <LocationSection
                  defaultCity={property.city}
                  defaultLocation={property.location}
                  register={register}
                  errors={errors}
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
                  errors={errors}
                />

                <button data-testid="submit-action" type="submit">
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
