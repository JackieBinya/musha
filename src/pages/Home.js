import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useProperties } from '../hooks';
import { PropertyIcons } from '../components/PropertyIcons';
import { ShortProperty } from '../components/ShortProperty';
import { Hero } from '../components/Hero';

export const Home = () => {
  const { properties } = useProperties();
  return (
    <>
      <Hero />
      <main>
        <div className="container">
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
        </div>
      </main>
    </>
  );
};
