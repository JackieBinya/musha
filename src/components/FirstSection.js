import React from 'react';

export const FirstSection = ({
  setAvailableTo,
  setMobileNumber,
  mobileNumber,
  availableTo,
  title,
  setTitle,
}) => {
  return (
    <section className="step-wrapper">
      <h3 className="step-headliner">Miscellaneous details</h3>
      <p>The property is available for :</p>
      <label>
        Rent
        <input
          type="radio"
          value="rent"
          checked={availableTo === 'rent'}
          onChange={(e) => setAvailableTo(e.target.value)}
        />
      </label>

      <label>
        Sale
        <input
          type="radio"
          value="sale"
          checked={availableTo === 'sale'}
          onChange={(e) => setAvailableTo(e.target.value)}
        />
      </label>

      <div>
        <label htmlFor="ad-title">Title</label>
        <input
          type="text"
          name="ad-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="mobile-number">Mobile Number</label>
        <input
          type="text"
          name="mobile-number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
      </div>
    </section>
  );
};
