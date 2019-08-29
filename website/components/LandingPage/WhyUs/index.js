import React from 'react';
import classNames from 'classnames';

import Section from '../common/Section';
import Heading from '../common/Heading';
import Subtitle from '../common/Subtitle';
import Oval from '../common/Oval';
import styles from '../index.module.css';

export default function WhyUs() {
  return (
    <Section className={classNames(styles.whyus, styles.fluid)}>
      <div
        className={classNames(
          'col col--3 col--offset-2',
          styles['section-content']
        )}
      >
        <Subtitle>Why choose us</Subtitle>
        <Heading className={styles['heading-white']}>
          Easy and ready
          <br />
          to implement solution
        </Heading>
        <p className={styles.paragraph}>
          A set of open-source libraries capable of instantly generating any
          given form.
        </p>
        <h2 className={styles.emphasis}>
          Carried out by the global community of 50+ developers.
        </h2>
        <p className={styles.paragraph}>
          Focused on providing a ready-to-implement solution, and effortless
          development experience. Keeps your code simple.
        </p>
      </div>
      <div
        className={classNames(
          'col',
          styles['section-content'],
          styles['section-bgwhite']
        )}
      >
        <div className="row">
          <div className="col col--5">
            <Oval size="100px">
              <img src="assets/icon-01.svg" className={styles['small-image']} />
            </Oval>
            <h2 className={styles['section-heading']}>
              Integrations with various schemas:
            </h2>
            <ul>
              <li>JSON Schema</li>
              <li>GraphQL</li>
              <li>SimpleSchema</li>
              <li>SimpleSchema2</li>
              <li>And any other - only a small wrapper is needed!</li>
            </ul>
          </div>
          <div className="col col--5">
            <Oval size="100px">
              <img src="assets/icon-02.svg" className={styles['small-image']} />
            </Oval>
            <h2 className={styles['section-heading']}>Wide range of themes:</h2>
            <ul>
              <li>AntD theme</li>
              <li>Bootstrap3</li>
              <li>Bootstrap4</li>
              <li>Material-UI</li>
              <li>Semantic UI</li>
              <li>Plain HTML</li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
