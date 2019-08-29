import React from 'react';
import classNames from 'classnames';

import Section from '../common/Section';
import Heading from '../common/Heading';
import Subtitle from '../common/Subtitle';
import Button from '../common/Button';

import styles from '../index.module.css';

export default function WhyUs() {
  return (
    <Section className={classNames(styles.whouses, styles.fluid)}>
      <div
        className={classNames(
          'col col--7',
          styles['section-content'],
          styles['section-bgwhite']
        )}
      >
        <div className={styles.grid3x3}>
          {Array.from({ length: 9 }).map((_, index) => (
            <div key={index} className={styles.item3x3}>
              <img
                className={styles.company}
                src={`assets/companies/${index + 1}.png`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={classNames('col col--3', styles['section-content'])}>
        <Subtitle>Lorem ipsum dolor</Subtitle>
        <Heading className={styles['heading-white']}>Who uses uniforms</Heading>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          auctor turpis eu purus placerat, sed venenatis orci hendrerit.
          Praesent porta tempor purus, nec consectetur ligula hendrerit non.
          Pellentesque fermentum sit amet tortor in rhoncus
        </p>
        <Button>Add your company</Button>
      </div>
    </Section>
  );
}
