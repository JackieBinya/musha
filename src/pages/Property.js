import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks';
import { Loader } from '../components/Loader';
import { PropertyIcons } from '../components/PropertyIcons';

export const Property = () => {
  const { propertyId } = useParams();
  const [index, setIndex] = useState(0);

  const { property } = useProperty(propertyId);

  const handleNext = () => {
    if (index + 1 === property.imageUrls.length) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  };

  const handlePrevious = () => {
    if (index - 1 < 0) {
      setIndex(property.imageUrls.length - 1);
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
          <h2>
            {property.title ? `New property in ${property.location}` : `title`}
          </h2>
          <div className="show-property_gallery">
            <img
              src={property.imageUrls ? property.imageUrls[index].url : ''}
              style={{ height: '500px', width: '450px' }}
            />
            <button type="button" onClick={handleNext}>
              Next
            </button>
            <button type="button" onClick={handlePrevious}>
              Previous
            </button>
          </div>

          <p>{property.description}</p>

          <PropertyIcons
            city={property.city}
            location={property.location}
            numberOfBathrooms={property.numberOfBathrooms}
            numberOfBedrooms={property.numberOfBedrooms}
          />
        </>
      )}
    </div>
  );
};
