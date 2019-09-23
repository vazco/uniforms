import React from 'react';
import classNames from 'classnames';

import Heading from './Heading';
import styles from './index.module.css';

function Testimonial({ who, company, position, description, mirror }) {
  return (
    <div
      className={classNames(
        styles.testimonial,
        styles['border-dashed'],
        mirror
          ? styles['border-disable-top-right']
          : styles['border-disable-bottom-left']
      )}
    >
      <div
        className={classNames(
          'text--center',
          styles['testimonial-content'],
          styles['border-gradient'],
          mirror
            ? styles['border-disable-bottom-left']
            : styles['border-disable-top-right']
        )}
      >
        <h2>{who}</h2>
        <p>
          <b>{company}</b>
          <br />
          {position}
        </p>
        <p
          className={classNames(styles.text, styles['testimonial-description'])}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className="section text--center">
      <p
        className={classNames(
          styles.centered,
          styles.text,
          styles['heading-helper']
        )}
      >
        They speak about us
      </p>
      <Heading>Testimonials</Heading>
      <div className={styles.testimonials}>
        <Testimonial
          who="Wojtek Trocki"
          company="Red Hat"
          position="Team Lead"
          description="uniforms it’s one and the only library that allows you to have greater flexibility on top of the React platform to building forms you like, with great robustness with advanced support of many different forms inputs."
        />
        <Testimonial
          mirror
          who="Serkan Durusoy"
          company="Paystack"
          position="Engineering Manager"
          description="The simplicity with which one can dive into details and break a form apart into it's primitive provides the much-needed peace of mind."
        />
      </div>
    </div>
  );
}
