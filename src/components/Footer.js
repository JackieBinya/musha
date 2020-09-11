import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

export const Footer = () => {
  return (
    <footer>
      <p>
        mushaa
        <span>
          <FontAwesomeIcon icon={faCopyright} className="footer-svg" />
        </span>
        2020
      </p>
    </footer>
  );
};
