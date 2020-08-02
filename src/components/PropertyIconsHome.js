import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBath, faBed, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { firebase } from '../firebase';

export const PropertyIconsHome = ({
  id,
  location,
  numberOfBathrooms,
  numberOfBedrooms,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { url } = useRouteMatch();

  const handleDelete = (e) => {
    firebase
      .firestore()
      .collection('properties')
      .doc(id)
      .delete()
      .then(() => {
        console.log(`Property with id ${id} is successfully deleted.`);
        setShowModal(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="property-icons">
      <div className="details-icons">
        <div className="property-icons-container">
          <FontAwesomeIcon icon={faBed} className="property-icons-svg" />
          <span className="property-icons-text">{numberOfBedrooms}</span>
        </div>

        <div className="property-icons-container">
          <FontAwesomeIcon icon={faBath} className="property-icons-svg" />

          <span className="property-icons-text">{numberOfBathrooms}</span>
        </div>
        <div className="property-icons-container">
          <FontAwesomeIcon icon={faMapMarker} className="property-icons-svg" />
          <span className="property-icons-text">{`${location}`}</span>
        </div>
      </div>
    </section>
  );
};
