import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks';
import { PropertyIcons } from '../components/PropertyIcons';
import { ShortProperty } from '../components/ShortProperty';

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

            <ShortProperty imageUrls={imageUrls}>
              <PropertyIcons
                city={city}
                location={location}
                numberOfBathrooms={numberOfBathrooms}
                numberOfBedrooms={numberOfBedrooms}
              />
            </ShortProperty>
          </li>
        )
      )}
    </>
  );
};
