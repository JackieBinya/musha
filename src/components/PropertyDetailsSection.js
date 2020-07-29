import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';

export const PropertyDetailsSection = ({
  register,
  defaultNumberOfBathrooms,
  defaultNumberOfBedrooms,
  defaultDescription,
}) => {
  console.log({ defaultDescription });
  return (
    <SectionWrapper heading="Property Details">
      <div className="details-wrapper">
        <label>
          Choose the number of bedrooms in your property:
          <select
            name="numberOfBedrooms"
            ref={register}
            defaultValue={
              defaultNumberOfBedrooms ? defaultNumberOfBedrooms : ''
            }
          >
            <option value="studio">Studio</option>
            <option value="1">1 bedroom</option>
            <option value="2">2 bedrooms</option>
            <option value="3">3+ bedrooms</option>
          </select>
        </label>
      </div>

      <div className="details-wrapper">
        <label>
          Choose the number of bathrooms in your property:
          <select
            name="numberOfBathrooms"
            ref={register}
            defaultValue={
              defaultNumberOfBathrooms ? defaultNumberOfBathrooms : ''
            }
          >
            <option value="shared">shared bathroom</option>
            <option value="1">1 bathroom</option>
            <option value="2">2 bathrooms</option>
            <option value="3">3+ bathrooms</option>
          </select>
        </label>
      </div>

      <div className="details-wrapper">
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          defaultValue={defaultDescription ? defaultDescription : ''}
          ref={register}
        />
      </div>
    </SectionWrapper>
  );
};
