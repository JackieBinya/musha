import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

export const Hero = () => {
  return (
    <div className="hero-container">
      <div className="hero">
        <div className="hero-overlay">
          <div className="hero-content-container">
            <p className="hero-content-headliner">
              Mushaa your property champions
            </p>
            <p className="hero-content">
              Residential sales and rentals for free!
            </p>
            <FontAwesomeIcon icon={faCopyright} />
            <span className="hero-content-year">2020</span>
          </div>
        </div>
      </div>
    </div>
  );
};
