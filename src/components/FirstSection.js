import React from 'react';
import { SectionWrapper } from '../components/SectionWrapper';
export const FirstSection = ({
  errors,
  register,
  defaultAvailableTo = '',
  defaultTitle = '',
  defaultMobileNumber,
}) => {
  return (
    <SectionWrapper heading="Miscellaneous Details">
      <p>*The property is available for :</p>
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
        {errors.availableTo && (
          <p className="hook-error">{errors.availableTo.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="title">*Ad title:</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={defaultTitle}
          ref={register}
        />
        {errors.title && <p className="hook-error">{errors.title.message}</p>}
      </div>

      <div>
        <label htmlFor="mobileNumber">*Your mobile number:</label>
        <input
          type="text"
          id="mobileNumber"
          name="mobileNumber"
          defaultValue={defaultMobileNumber}
          ref={register}
        />
        {errors.mobileNumber && (
          <p className="hook-error">{errors.mobileNumber.message}</p>
        )}
      </div>
    </SectionWrapper>
  );
};
