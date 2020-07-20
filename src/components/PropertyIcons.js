import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  user = '',
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
        <button type="button" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>

        {/* <Link to={`/my-properties/edit/${id}`}>hello</Link> */}

        <FontAwesomeIcon icon={faPen} />
      </div>
    </section>
  );
};
