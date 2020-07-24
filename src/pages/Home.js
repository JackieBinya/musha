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
        <div className="main container">
          {properties.map(
            ({
              id,
              location,
              imageUrls,
              numberOfBathrooms,
              numberOfBedrooms,
              city,
              title,
              description,
            }) => (
              <li key={id} className="main-list-item">
                <Link to={`/property/${id}`} className="main-link">
                  <ShortProperty
                    imageUrls={imageUrls}
                    title={title}
                    location={location}
                    description={description}
                  >
                    <PropertyIcons
                      city={city}
                      title={title}
                      location={location}
                      numberOfBathrooms={numberOfBathrooms}
                      numberOfBedrooms={numberOfBedrooms}
                    />
                  </ShortProperty>
                </Link>
              </li>
            )
          )}
        </div>
      </main>
    </>
  );
};
