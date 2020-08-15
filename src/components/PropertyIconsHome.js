import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faMapMarker } from '@fortawesome/free-solid-svg-icons';

export const PropertyIconsHome = ({
  location,
  numberOfBathrooms,
  numberOfBedrooms,
}) => (
  <section className="property-icons">
    <div className="details-icons">
      <div className="property-icons-container">
        <FontAwesomeIcon icon={faBed} className="property-icons-svg" />
        <span className="property-icons-text">{numberOfBedrooms}</span>
      </div>

      <div className="property-icons-container">
        <FontAwesomeIcon icon={faBath} className="property-icons-svg" />

        <span className="property-icons-text">{numberOfBathrooms}</span>
      </div>
      <div className="property-icons-container">
        <FontAwesomeIcon icon={faMapMarker} className="property-icons-svg" />
        <span className="property-icons-text">{`${location}`}</span>
      </div>
    </div>
  </section>
);
