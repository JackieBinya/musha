import React from 'react';
import { Link } from 'react-router-dom';

const properties = [
  {
    name: 'property0',
    propertyId: 0,
  },
  {
    name: 'property1',
    propertyId: 1,
  },
];

export const Home = () => {
  return (
    <>
      <h2>Home</h2>
      {properties.map(({ propertyId, name }) => (
        <li key={propertyId}>
          <Link to={`/property/${propertyId}`}>{name}</Link>
        </li>
      ))}
    </>
  );
};
