import React from 'react';
import classNames from 'classnames';

import Heading from './Heading';
import Oval from './Oval';
import Subtitle from './Subtitle';
import styles from './index.module.css';

export default function WhyUs() {
  return (
    <div
      className={classNames(
        'hero hero--primary',
        styles['overflow-hidden'],
        styles.whyus
      )}
    >
      <div className="container">
        <div className="section">
          <div className="row">
            <div
              className={classNames('col col--5', styles['section-content'])}
            >
              <Subtitle>Why choose us</Subtitle>
              <Heading className={styles['heading-white']}>
                Easy and ready
                <br />
                to implement solution
              </Heading>
              <p className={classNames(styles.text, styles.paragraph)}>
                A set of open-source libraries capable of instantly generating
                any given form.
              </p>
              <h2 className={classNames(styles.text, styles.emphasis)}>
                Carried out by the global community of 50+ developers.
              </h2>
              <p className={classNames(styles.text, styles.paragraph)}>
                Focused on providing a ready-to-implement solution, and
                effortless development experience. Keeps your code simple.
              </p>
            </div>
            <div
              className={classNames(
                'col',
                styles['section-content'],
                styles['section-bgwhite']
              )}
            >
              <span
                className={classNames(
                  styles['section-bgwhite-block'],
                  styles['section-bgwhite-block-right']
                )}
              />
              <div className={classNames('row', styles.padding)}>
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="assets/icon-01.svg"
                      className={styles['small-image']}
                    />
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
                <div className="col">
                  <Oval className={styles.white}>
                    <img
                      src="assets/icon-02.svg"
                      className={styles['small-image']}
                    />
                  </Oval>
                  <h2 className={styles['section-heading']}>
                    Wide range of themes:
                  </h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}
