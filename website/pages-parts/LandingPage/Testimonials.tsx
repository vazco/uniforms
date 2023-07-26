import classNames from 'classnames';
import React, { useState } from 'react';
import { GitHub, Linkedin } from 'react-feather';

import { Heading } from '../../components/Heading';
import { IconLink } from '../../components/IconLink';
import styles from '../../index.module.css';

type Testimonial = {
  company: string;
  description: JSX.Element;
  position: string;
  who: string;
  avatar: string;
  linkGithub: string;
  linkLinkedin: string;
};

const testimonials: Testimonial[] = [
  {
    company: 'Resolve',
    description: (
      <>
        uniforms is the backbone of our data-intensive web-applications. We have
        about 200 different forms, from very simple ones, to ones that are
        filled with complex data-loading conditional form components, which
        create an incredible UX for our users. And if you really need to push
        the limits of what you can do with forms, I would highly recommend{' '}
        <b>
          <a href="https://www.vazco.eu/" target="blank">
            reaching out to Vazco
          </a>
        </b>{' '}
        themselves for expert advice.
      </>
    ),
    position: 'CTO and Co-Founder',
    who: 'Florian Bienefelt',
    avatar: 'img/avatar/florian-bienefelt.jpg',
    linkGithub: 'https://github.com/Floriferous',
    linkLinkedin: 'https://ch.linkedin.com/in/florianbienefelt',
  },
  {
    company: 'Mindtree',
    description: (
      <>
        Vazco&apos;s uniforms is a developer&apos;s go-to solution for
        simplifying form creation and validation in JavaScript applications.
        With its intuitive APIs and extensive feature set, uniforms streamlines
        the process of building complex forms. It offers a wide range of input
        types, validation options, and customization possibilities. Backed by an
        active community, Vazco&apos;s uniforms ensures ongoing support and
        updates, empowering developers to enhance productivity and deliver
        polished, user-friendly applications.
      </>
    ),
    position: 'Senior Technical Specialist',
    who: 'Lorant Vajda',
    avatar: 'img/avatar/lorant-vajda.jpg',
    linkGithub: 'https://github.com/lortschi',
    linkLinkedin: 'https://www.linkedin.com/in/lorant-vajda-596372181/',
  },

  {
    company: 'Simple Commerce',
    description: (
      <>
        We were looking for a forms library that was compatible with React and
        would help us build forms quicker with built-in logic without having to
        create it from scratch. And the addition of a GraphQL schema bridge was
        a no-brainer for us. We added a custom method to help validate required
        fields based on our GraphQL schema which made it even more practical and
        quick to use with the built-in features and extensibility. The support
        for the library is also great, I have never had issues asking questions
        and getting answers to point me in the right direction.
      </>
    ),
    position: 'Software Developer',
    who: 'Kheang Hok Chin',
    avatar: 'img/avatar/kheang-hok-chin.jpg',
    linkGithub: 'https://github.com/simplecommerce',
    linkLinkedin: 'https://www.linkedin.com/in/khokchin',
  },
  {
    company: 'Okra',
    description: (
      <>
        I used uniforms extensively during the height of Meteor.js as a
        replacement for the dominant forms solution which hadn&apos;t caught up
        with React. The flexibility to leverage different schema solutions
        coupled with a thoughtfully architected API with a very clean source
        implementation quickly made it my go-to solution for multiple
        forms-heavy applications that probably shaved off significant
        development time and directly boosted my productivity.
      </>
    ),
    position: 'Head of Engineering',
    who: 'Serkan Durusoy',
    avatar: 'img/avatar/serkan-durusoy.jpg',
    linkGithub: 'https://github.com/serkandurusoy',
    linkLinkedin: 'https://www.linkedin.com/in/serkandurusoy/',
  },

  {
    company: 'Toptal',
    description: (
      <>
        uniforms is my go-to solution for quite a while. Great holistic approach
        to tackle forms. I especially love the approach to making custom form
        layouts. Developer experience par-excellence.
      </>
    ),
    position: 'Front-end Platform Architect',
    who: 'Viktor Bezdek',
    avatar: 'img/avatar/viktor-bezdek.jpg',
    linkGithub: 'https://github.com/viktorbezdek',
    linkLinkedin: 'https://www.linkedin.com/in/viktorbezdek/',
  },
  {
    company: 'MongoDB',
    description: (
      <>
        Vazco&apos;s uniforms is one and the only library that allows you to
        have greater flexibility on top of the React platform to building forms
        you like.
      </>
    ),
    position: 'Software Engineer',
    who: 'Wojciech Trocki',
    avatar: 'img/avatar/wojciech-trocki.jpg',
    linkGithub: 'https://github.com/wtrocki',
    linkLinkedin: 'https://www.linkedin.com/in/wojciech-t-39574526/',
  },
];

export type TestimonialProps = {
  avatar: string;
  company: string;
  description: JSX.Element;
  linkGithub: string;
  linkLinkedin: string;
  position: string;
  who: string;
};

export function Testimonial({
  testimonial,
  mirror,
}: {
  testimonial: TestimonialProps;
  mirror: boolean;
}) {
  const {
    avatar,
    company,
    description,
    linkGithub,
    linkLinkedin,
    position,
    who,
  } = testimonial;

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
          <IconLink icon={GitHub} to={linkGithub} />
          <IconLink icon={Linkedin} to={linkLinkedin} />
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
  const [slide, setSlide] = useState(0);

  const setNextSlide = () => {
    setSlide(prevSlide =>
      prevSlide === testimonials.length - 2 ? 0 : prevSlide + 1,
    );
  };

  const setPrevSlide = () => {
    setSlide(prevSlide =>
      prevSlide === 0 ? testimonials.length - 2 : prevSlide - 1,
    );
  };

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
        <button
          className={classNames(
            styles['arrow-button'],
            styles['left-arrow-button'],
          )}
          onClick={setPrevSlide}
        >
          <img
            alt="arrow-left"
            src="assets/arrow-left.svg"
            className={styles['arrow']}
          />
        </button>

        <div className={styles['carousel-container']}>
          <div
            className={styles['carousel']}
            style={{
              transform: `translate(-${slide * 50}%)`,
            }}
          >
            {testimonials.map((testimonial, testimonialIdx) => (
              <Testimonial
                key={testimonialIdx}
                testimonial={testimonial}
                mirror={testimonialIdx !== slide}
              />
            ))}
          </div>
        </div>

        <button
          className={classNames(
            styles['arrow-button'],
            styles['right-arrow-button'],
          )}
          onClick={setNextSlide}
        >
          <img
            alt="arrow-right"
            src="assets/arrow-right.svg"
            className={styles['arrow']}
          />
        </button>
      </div>
    </div>
  );
}
