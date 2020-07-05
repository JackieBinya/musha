import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/my-properties">My Properties</Link>
    </li>
    <li>
      <Link to="/login">Sign In</Link>
    </li>
  </ul>
);
