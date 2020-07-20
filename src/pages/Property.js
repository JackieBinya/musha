import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks';
import { Loader } from '../components/Loader';
import { PropertyIcons } from '../components/PropertyIcons';

export const Property = () => {
  const { propertyId } = useParams();
  const [index, setIndex] = useState(0);

  const { property } = useProperty(propertyId);

  const {
    imageUrls,
    location,
    title,
    numberOfBathrooms,
    numberOfBedrooms,
    description,
    city,
  } = property;

  const handleNext = () => {
    if (index + 1 === imageUrls.length) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  };

  const handlePrevious = () => {
    console.log({ index });
    if (index - 1 < 0) {
      setIndex(imageUrls.length - 1);
      return;
    }
    setIndex(index - 1);
  };

  return (
    <div className="show-property">
      {!property ? (
        <Loader />
      ) : (
        <>
          <h2>{title ? `New property in ${location}` : `title`}</h2>
          <div className="show-property_gallery">
            <img
              src={imageUrls ? imageUrls[index].url : ''}
              style={{ height: '500px', width: '450px' }}
            />
            <button type="button" onClick={handleNext}>
              Next
            </button>
            <button type="button" onClick={handlePrevious}>
              Previous
            </button>
          </div>

          <p>{description}</p>

          <PropertyIcons
            city={city}
            location={location}
            numberOfBathrooms={numberOfBathrooms}
            numberOfBedrooms={numberOfBedrooms}
          />
        </>
      )}
    </div>
  );
};
