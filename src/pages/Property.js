import React from 'react';
import { useParams } from 'react-router-dom';

export const SingleProperty = () => {
const { propertyId } = useParams()
console.log({ propertyId });
return (
    <h2>Single Property</h2>
)
}
