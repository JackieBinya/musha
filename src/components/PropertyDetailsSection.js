import React from 'react';

export const PropertyDetailsSection = ({
  numberOfBathrooms,
  setNumberOfBathrooms,
  numberOfBedrooms,
  setNumberOfBedRooms,
  description,
  setDescription,
}) => {
  return (
    <section className="step-wrapper">
     <h3 className="step-headliner">Property Details</h3>
      <div>
        <label>
          Choose the number of bedrooms in your property:
          <select
            value={numberOfBedrooms}
            onChange={(e) => setNumberOfBedRooms(e.target.value)}
          >
            <option value="studio">Studio</option>
            <option value="1">1 bedroom</option>
            <option value="2">2 bedrooms</option>
            <option value="3">3+ bedrooms</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Choose the number of bathrooms in your property:
          <select
            value={numberOfBathrooms}
            onChange={(e) => setNumberOfBathrooms(e.target.value)}
          >
            <option value="shared">shared bathroom</option>
            <option value="1">1 bathroom</option>
            <option value="2">2 bathrooms</option>
            <option value="3">3+ bathrooms</option>
          </select>
        </label>
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          rows="8"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </section>
  );
};
