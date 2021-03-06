import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
export const ShortProperty = ({
  children,
  imageUrls,
  title,
  location,
  description = '',
}) => {
  const { url } = useRouteMatch();

  return (
    <section
      className={`short-property ${
        url === '/' ? 'custom-pointer' : 'default-pointer'
      }`}
    >
      {imageUrls.length && (
        <div className="short-property-image-container">
          <img
            src={imageUrls[0].url}
            alt="property"
            className="short-property-image"
          />
          <div className="icon-container">
            <FontAwesomeIcon icon={faCamera} />
            <span>{imageUrls.length}</span>
          </div>
        </div>
      )}

      <div className="short-property-right">
        <div
          className={`short-property-title ${url === '/' ? 'show' : 'hide'}`}
        >
          {' '}
          {title ? `${title}` : `New property in ${location}`}
        </div>

        <div className={`${url === '/' ? 'show' : 'hide'}`}>
          <p className="short-property-description">
            {description.replace(/(([^\s]+\s\s*){55})(.*)/, '$1…')}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};
