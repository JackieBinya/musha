import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => <>
<h2>Home</h2>
<Link to='/property/:id'>Single Property</Link>
</>