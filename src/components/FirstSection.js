import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
export const FirstSection = ({
  register,
  defaultAvailableTo = '',
  defaultTitle = '',
  defaultMobileNumber,
}) => {
  return (
    <SectionWrapper heading="Miscellaneous Details">
      <p>The property is available for :</p>
      <div className="radio-wrapper">
        <div>
          <label>
            <input
              type="radio"
              value="rent"
              name="availableTo"
              defaultChecked={defaultAvailableTo === 'rent' ? true : false}
              ref={register}
            />
            Rent
          </label>
        </div>

        <div>
          <label>
            <input
              type="radio"
              value="sale"
              name="availableTo"
              defaultChecked={defaultAvailableTo === 'sale' ? true : false}
              ref={register}
            />
            Sale
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="title">Ad title:</label>
        <input
          type="text"
          name="title"
          defaultValue={defaultTitle}
          ref={register}
        />
      </div>

      <div>
        <label htmlFor="mobileNumber">Your mobile Number:</label>
        <input
          type="text"
          name="mobileNumber"
          defaultValue={defaultMobileNumber}
          ref={register}
        />
      </div>
    </SectionWrapper>
  );
};
