import React from 'react';

export const ShortProperty = ({ children, imageUrls }) => {
  return (
    <section>
      {imageUrls && (
        <img
          src={imageUrls[0].url}
          style={{ height: '200px', width: '200px' }}
          alt=""
        />
      )}

      {children}
    </section>
  );
};
