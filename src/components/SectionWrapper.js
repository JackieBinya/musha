import React from 'react';

export const SectionWrapper = ({ children, heading }) => (
  <section className="step-wrapper">
    <h3 className="step-headliner">{heading}</h3>
    <div className="step-contents">{children}</div>
  </section>
);
