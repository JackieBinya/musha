import React from 'react';
import { useParams } from 'react-router-dom';

export const Property = () => {
const { propertyId } = useParams()
console.log({ propertyId });
return (
    <h2>Property</h2>
)
}
