import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faBath,
  faBed,
  faMapMarker,
  faTrash,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import { firebase } from '../firebase';

export const PropertyIcons = ({
  id,
  location,
  city,
  numberOfBathrooms,
  numberOfBedrooms,
  title,
  user = '',
  path = '',
}) => {
  const handleDelete = () => {
    firebase
      .firestore()
      .collection('properties')
      .doc(id)
      .delete()
      .then(() =>
        console.log(`Property with id ${id} is successfully deleted.`)
      )
      .catch((error) => console.log(error));
  };

  return (
    <section className="property-icons">
      <div className="details-icons">
        <div className="property-icons-container">
          <FontAwesomeIcon icon={faBed} className="property-icons-svg" />
          <span className="property-icons-text">{numberOfBedrooms}</span>
          {'|'}
        </div>

        <div className="property-icons-container">
          <FontAwesomeIcon icon={faBath} className="property-icons-svg" />

          <span className="property-icons-text">{numberOfBathrooms}</span>
          {'|'}
        </div>
        <div className="property-icons-container">
          <FontAwesomeIcon icon={faMapMarker} className="property-icons-svg" />
          <span className="property-icons-text">{`${location}`}</span>
        </div>
      </div>

      <div  className="edit-icons">
        <button
          className={user ? 'show' : 'hide'}
          type="button"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faTrash} className="property-icons-svg" />
        </button>

        <Link className={user ? 'show' : 'hide'} to={`${path}/edit/${id}`}>
          <FontAwesomeIcon icon={faPen} className="property-icons-svg" />
        </Link>
      </div>
    </section>
  );
};
