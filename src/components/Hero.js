import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Hero = ({ query, setQuery }) => {
  return (
    <div className="hero-container">
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
                style={{
                  paddingLeft: '2em',
                  height: '60px',
                  outline: 'none',
                  border: '1px solid transparent',
                  borderRadius: '6px',
                  width: '100%',
                  backgroundColor: 'whitesmoke',
                  fontSize: '1rem',
                }}
              />
              <FontAwesomeIcon
                style={{
                  position: 'absolute',
                  zIndex: '5000',
                  fontSize: '1.2rem',
                  color: 'grey',
                  left: '10px',
                  top: ' 4em',
                }}
                icon={faSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
