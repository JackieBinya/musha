import React from 'react';

export const FirstSection = ({
  setAvailableTo,
  setMobileNumber,
  mobileNumber,
  availableTo,
  title = '',
  setTitle,
}) => {
  return (
    <section className="step-wrapper">
      <h3 className="step-headliner">Miscellaneous details</h3>
      <div className="step-contents">
        <p>The property is available for :</p>
        <div className="radio-wrapper">
          <div>
            <label>
              <input
                type="radio"
                value="rent"
                checked={availableTo === 'rent'}
                onChange={(e) => setAvailableTo(e.target.value)}
              />
              Rent
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="sale"
                checked={availableTo === 'sale'}
                onChange={(e) => setAvailableTo(e.target.value)}
              />
              Sale
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="ad-title">Ad title:</label>
          <input
            type="text"
            name="ad-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="mobile-number">Your mobile Number:</label>
          <input
            type="text"
            name="mobile-number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
};
