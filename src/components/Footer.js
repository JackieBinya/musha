import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <footer>
      <hr />
      <p>
        mushaa
        <span>
          <FontAwesomeIcon icon={faCopyright} className="property-icons-svg" />
        </span>
        2020
      </p>
    </footer>
  );
};
