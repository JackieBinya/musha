import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';
import { useProperties } from '../hooks';
import { ShortProperty } from '../components/ShortProperty';
import { Hero } from '../components/Hero';
import { Loader } from '../components/Loader';
import { PropertyIconsHome } from '../components/PropertyIconsHome';
import { Footer } from '../components/Footer';

export const Home = () => {
  const { properties } = useProperties();
  const [query, setQuery] = useState('');

  if (properties === null) {
    return <Loader />;
  }

  const fuse = new Fuse(properties, {
    keys: ['location', 'city'],
  });

  const results = fuse.search(query);

  const propertiesResults = query
    ? results.map((result) => result.item)
    : properties;

  return (
    <div className="home-page-wrapper">
      <Hero query={query} setQuery={setQuery} />
      <main>
        <div className="main container">
          {propertiesResults.length === 0 ? (
            <p>Ooops!!!No properties found.</p>
          ) : propertiesResults ? (
            propertiesResults.map(
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
                      <PropertyIconsHome
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
            )
          ) : (
            ''
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
