import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Hero = ({ query, setQuery }) => {
  return (
    <section className="hero-container">
      <div className="hero">
        <div className="hero-overlay">
          <div className="hero-content-container">
            <p className="hero-content-headliner">
              Residential sales and rentals for free!
            </p>
            <div>
              <input
                type="search"
                placeholder="Search by location"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
              />
              <FontAwesomeIcon className="search-svg" icon={faSearch} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
