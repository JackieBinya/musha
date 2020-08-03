import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProperty } from '../hooks';
import { Loader } from '../components/Loader';
import { PropertyIcons } from '../components/PropertyIcons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

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
    <div className=" container show-property">
      {!property ? (
        <Loader />
      ) : (
        <>
          <h2>
            {property.title ? `New property in ${property.location}` : `title`}
          </h2>

          <div className="show-property-gallery">
            <div>
              <img
                src={property.imageUrls ? property.imageUrls[index].url : ''}
              />
              <button
                type="button"
                onClick={handleNext}
                className="show-property-gallery-next"
              >
                <FontAwesomeIcon icon={faChevronCircleRight} />
              </button>
              <button
                type="button"
                onClick={handlePrevious}
                className="show-property-gallery-previous"
              >
                <FontAwesomeIcon icon={faChevronCircleLeft} />
              </button>
            </div>
          </div>

          <PropertyIcons
            city={property.city}
            location={property.location}
            numberOfBathrooms={property.numberOfBathrooms}
            numberOfBedrooms={property.numberOfBedrooms}
          />

          <div>
            <h3>Description</h3>
            <p style={{whiteSpace:'pre-wrap', overflowWrap: 'break-word'}}>{property.description}</p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2em',
            }}
          >
            <h3 style={{ marginRight: '0.3em' }}>Contact</h3>
            <span> {property.mobileNumber}</span>
          </div>
        </>
      )}
    </div>
  );
};
