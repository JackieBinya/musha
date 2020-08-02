import React, { useState } from 'react';
import { SectionWrapper } from '../components/SectionWrapper';

export const LocationSection = ({
  register,
  defaultCity = '',
  defaultLocation = '',
}) => {
  return (
    <SectionWrapper heading="Location">
      <div>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          defaultValue={defaultCity ? defaultCity : ''}
          ref={register}
        />
      </div>

      <div>
        <label htmlFor="location">Location/Suburb:</label>
        <input
          type="text"
          name="location"
          defaultValue={defaultLocation ? defaultLocation : ''}
          ref={register}
        />
      </div>
    </SectionWrapper>
  );
};
