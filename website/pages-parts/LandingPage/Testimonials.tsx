import classNames from 'classnames';
import React from 'react';
import { GitHub, Linkedin } from 'react-feather';

import { Heading } from '../../components/Heading';
import { IconLink } from '../../components/IconLink';
import styles from '../../index.module.css';

export type TestimonialProps = {
  avatar: string;
  company: string;
  description: JSX.Element;
  linkGithub: string;
  linkLinkedin: string;
  mirror?: boolean;
  position: string;
  who: string;
};

export function Testimonial({
  avatar,
  company,
  description,
  linkGithub,
  linkLinkedin,
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
        <img src={avatar} alt={who} className={styles['testimonial-avatar']} />
        <p>
          <b>{who}</b>
          <br />
          {position} at <b>{company}</b>
          <br />
        </p>
        <div className={styles['testimonial-links-wrapper']}>
          <IconLink
            className={styles['testimonial-icon-color']}
            icon={GitHub}
            to={linkGithub}
          />
          <IconLink
            className={styles['testimonial-icon-color']}
            icon={Linkedin}
            to={linkLinkedin}
          />
        </div>
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
          company="Resolve"
          description={
            <>
              uniforms is the backbone of our data-intensive web-applications.
              We have about 200 different forms, from very simple ones, to ones
              that are filled with complex data-loading conditional form
              components, which create an incredible UX for our users. And if
              you really need to push the limits of what you can do with forms,
              I would highly recommend{' '}
              <b>
                <a href="https://www.vazco.eu/" target="blank">
                  reaching out to Vazco
                </a>
              </b>{' '}
              themselves for expert advice.
            </>
          }
          position="CTO and Co-Founder at Resolve"
          who="Florian Bienefelt"
          avatar="img/avatar/florian-bienefelt.jpg"
          linkGithub="https://github.com/Floriferous"
          linkLinkedin="https://ch.linkedin.com/in/florianbienefelt"
        />
        <Testimonial
          company="Toptal"
          description={
            <>
              uniforms is my go-to solution for quite a while. Great holistic
              approach to tackle forms. I especially love the approach to making
              custom form layouts. Developer experience par-excellence.
            </>
          }
          mirror
          position="Front-end Platform Architect"
          who="Viktor Bezdek"
          avatar="img/avatar/viktor-bezdek.jpg"
          linkGithub="https://github.com/viktorbezdek"
          linkLinkedin="https://www.linkedin.com/in/viktorbezdek/"
        />
      </div>
    </div>
  );
}
