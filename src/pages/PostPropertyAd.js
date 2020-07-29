import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { PropertyForm } from '../components/Property-Form';

export const PostPropertyAd = () => (
  <div className="container">
    <h1>Create a property ad</h1>

    <h2>Fill in the form below as accurately as possible.</h2>

    <FontAwesomeIcon icon={faSpinner} spin className="property-icons-svg" />

    <PropertyForm />
  </div>
);
