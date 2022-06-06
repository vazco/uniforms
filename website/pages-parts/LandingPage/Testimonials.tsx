import classNames from 'classnames';
import React from 'react';

import { Heading } from '../../components/Heading';
import styles from '../../index.module.css';

export type TestimonialProps = {
  company: string;
  description: string;
  mirror?: boolean;
  position: string;
  who: string;
};

export function Testimonial({
  company,
  description,
  mirror,
  position,
  who,
}: TestimonialProps) {
  return (
    <div
      className={classNames(
        styles.testimonial,
        styles['border-dashed'],
        mirror
          ? styles['border-disable-top-right']
          : styles['border-disable-bottom-left'],
      )}
    >
      <div
        className={classNames(
          'text--center',
          styles['testimonial-content'],
          styles['border-gradient'],
          mirror
            ? styles['border-disable-bottom-left']
            : styles['border-disable-top-right'],
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

export function Testimonials() {
  return (
    <div className="section text--center">
      <h3
        className={classNames(
          styles.centered,
          styles.text,
          styles['heading-helper'],
        )}
      >
        They speak about us
      </h3>
      <Heading>Testimonials</Heading>
      <div className={styles.testimonials}>
        <Testimonial
          company="Red Hat"
          description="uniforms it’s one and the only library that allows you to have greater flexibility on top of the React platform to building forms you like, with great robustness with advanced support of many different forms inputs."
          position="Team Lead"
          who="Wojtek Trocki"
        />
        <Testimonial
          company="Paystack"
          description="The simplicity with which one can dive into details and break a form apart into it's primitive provides the much-needed peace of mind."
          mirror
          position="Engineering Manager"
          who="Serkan Durusoy"
        />
      </div>
    </div>
  );
}
