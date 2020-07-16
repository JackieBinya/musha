import React from 'react';
import { FirstStep } from './FirstStep';

export const LocationStep = ({ city, setCity, location, setLocation }) => {
  return (
    <>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="location">Location/Suburb</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </>
  );
};
