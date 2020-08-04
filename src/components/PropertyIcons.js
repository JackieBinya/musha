import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
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
  numberOfBathrooms,
  numberOfBedrooms,
  path = '',
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

      <div className={`${url === '/my-properties' ? 'edit-icons' : 'hide'}`}>
        <div>
          <div
            className={`confirm-delete-modal ${showModal ? 'show' : 'hide'}`}
          >
            <span>Are you sure you want to delete?</span>
            <div className="wrapper">
              <button type="button" onClick={(e) => handleDelete(e)}>
                Yes
              </button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>

          <button
            className={` ${showModal ? 'hide' : 'show'}`}
            type="button"
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faTrash} className="property-icons-svg" />
          </button>
        </div>

        <Link to={`${path}/edit/${id}`}>
          <FontAwesomeIcon icon={faPen} className="property-icons-svg" />
        </Link>
      </div>
    </section>
  );
};
