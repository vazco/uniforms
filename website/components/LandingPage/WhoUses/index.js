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
                Our package has been used in several projects worldwide. From
                small to the corporate business solutions and well-known
                enterprises. Companies trusted us in the development of both
                simple forms and sophisticated management systems.
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
