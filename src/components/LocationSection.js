import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';

export const LocationSection = ({
  errors,
  register,
  defaultCity = '',
  defaultLocation = '',
}) => {
  return (
    <SectionWrapper heading="Location">
      <div>
        <label htmlFor="city">*City:</label>
        <input
          type="text"
          name="city"
          id="city"
          defaultValue={defaultCity ? defaultCity : ''}
          ref={register}
        />
        {errors.city && <p className="hook-error">{errors.city.message}</p>}
      </div>

      <div>
        <label htmlFor="location">*Location/Suburb:</label>
        <input
          type="text"
          name="location"
          id="location"
          defaultValue={defaultLocation ? defaultLocation : ''}
          ref={register}
        />
        {errors.location && (
          <p className="hook-error">{errors.location.message}</p>
        )}
      </div>
    </SectionWrapper>
  );
};
