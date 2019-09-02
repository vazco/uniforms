import React from 'react';
import classNames from 'classnames';

import Heading from '../common/Heading';
import Subtitle from '../common/Subtitle';
import Button from '../common/Button';

import styles from '../index.module.css';

export default function WhyUs() {
  return (
    <div className="hero hero--primary">
      <div className="container">
        <div className="section">
          <div className="row">
            <div className={classNames('col', styles['section-content'])}>
              <span
                className={classNames(
                  styles['section-bgwhite-block'],
                  styles['section-bgwhite-block-left']
                )}
              />
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
            <div
              className={classNames('col col--5', styles['section-content'])}
            >
              <Subtitle>Lorem ipsum dolor</Subtitle>
              <Heading className={styles['heading-white']}>
                Who uses uniforms
              </Heading>
              <p className={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas auctor turpis eu purus placerat, sed venenatis orci
                hendrerit. Praesent porta tempor purus, nec consectetur ligula
                hendrerit non. Pellentesque fermentum sit amet tortor in rhoncus
              </p>
              <div className={styles['center-if-sm']}>
                <Button>Add your company</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
