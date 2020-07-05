import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/sign_in">Sign In</Link>
    </li>
  </ul>
);
