import React, { useState } from 'react';
import { FirstStep } from './FirstSection';

export const LocationSection = ({ city, setCity, location, setLocation }) => {
  return (
    <section className="step-wrapper">
      <h3 className="step-headliner">Location</h3>
      <div className="step-contents">
        <div>
          <label htmlFor="city">City:</label>
          <div>
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          </div>
        </div>

        <div>
          <label htmlFor="location">Location/Suburb:</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
