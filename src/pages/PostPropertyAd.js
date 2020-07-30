import React, { useState } from 'react';

import { PropertyForm } from '../components/Property-Form';

export const PostPropertyAd = () => (
  <div className="container">
    <h1>Create a property ad</h1>

    <h2>Fill in the form below as accurately as possible.</h2>

    <PropertyForm />
  </div>
);
