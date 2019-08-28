import React from 'react';
import classNames from 'classnames';

import Section from '../common/Section';
import Heading from '../common/Heading';
import Subtitle from '../common/Subtitle';
import styles from '../index.module.css';

export default function WhyUs() {
  return (
    <Section className={styles.whouses}>
      <div className={classNames('col col--7', styles['section-bgwhite'])} />
      <div className="col col--3">
        <Subtitle>Lorem ipsum dolor</Subtitle>
        <Heading className={styles['heading-white']}>Who uses uniforms</Heading>
        <p className={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          auctor turpis eu purus placerat, sed venenatis orci hendrerit.
          Praesent porta tempor purus, nec consectetur ligula hendrerit non.
          Pellentesque fermentum sit amet tortor in rhoncus
        </p>
      </div>
    </Section>
  );
}
