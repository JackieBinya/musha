import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faMapMarker } from '@fortawesome/free-solid-svg-icons';

export const Home = () => {
  const { properties } = useProperties();
  return (
    <>
      <h2>Home</h2>
      {properties.map(
        ({
          id,
          location,
          imageUrls,
          numberOfBathroom,
          numberOfBathrooms,
          numberOfBedrooms,
          city,
          title,
        }) => (
          <li key={id}>
            <Link to={`/property/${id}`}>
              {' '}
              {title ? `${title}` : `New property in ${location}`}
            </Link>
            <section>
              {imageUrls &&
                  <img
                    src={imageUrls[0].url}
                    style={{ height: '200px', width: '200px' }}
                    alt=""
                  />
              }

              <div style={{display:'flex'}}>
              <FontAwesomeIcon icon={faBed} />
              {numberOfBedrooms}{'|'}
              <FontAwesomeIcon icon={faBath} />{'|'}
              {numberOfBathrooms}
              <FontAwesomeIcon icon={faMapMarker} />
              {`${location},${city}.`}
              </div>
            </section>
          </li>
        )
      )}
    </>
  );
};
