import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
export const ShortProperty = ({
  children,
  imageUrls,
  title,
  location,
  description,
}) => {
  return (
    <section className="short-property">
      {imageUrls && (
        <div className="short-property-image-container">
          <img
            src={imageUrls[0].url}
            alt="Main picture of the property"
            className="short-property-image"
          />
          <div className="icon-container">
            <FontAwesomeIcon icon={faCamera} />
            <span>{imageUrls.length}</span>
          </div>
        </div>
      )}

      <div className="short-property-right">
        <div className="short-property-title">
          {' '}
          {title ? `${title}` : `New property in ${location}`}
        </div>

        <div>
          <p className="short-property-description">{description}</p>
        </div>
        {children}
      </div>
    </section>
  );
};
