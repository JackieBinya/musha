import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBath,
  faBed,
  faMapMarker,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

export const PropertyIcons = ({
  location,
  city,
  numberOfBathrooms,
  numberOfBedrooms,
  user = '',
}) => (
  <section className="property-icons" style={{ display: 'flex' }}>
    <div>
      <FontAwesomeIcon icon={faBed} />
      {numberOfBedrooms}
      {'|'}
      <FontAwesomeIcon icon={faBath} />
      {'|'}
      {numberOfBathrooms}
      <FontAwesomeIcon icon={faMapMarker} />
      {`${location},${city}.`}
    </div>

    <div className={user ? 'show' : 'hide'}>
      <FontAwesomeIcon icon={faPen} />
      <FontAwesomeIcon icon={faTrash} />
    </div>
  </section>
);
