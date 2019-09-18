import React from 'react';
import classNames from 'classnames';

import Heading from '../common/Heading';
import Subtitle from '../common/Subtitle';
import Button from '../common/Button';
import styles from '../index.module.css';

export default function WhyUs() {
  return (
    <div
      className={classNames('hero hero--primary', styles['overflow-hidden'])}
    >
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
                {[
                  'https://www.deskpro.com/',
                  'https://www.nokia.com/',
                  'https://www.redhat.com/en',
                  'https://github.com/react-page/react-page/tree/master/packages/plugins/createPluginMaterialUi',
                  'https://graphback.dev',
                  'https://www.onyx-one.com/',
                  'http://aerogear.org',
                  'https://cleverbeagle.com/together',
                  'http://www.orionjs.org'
                ].map((href, index) => (
                  <a href={href} key={index} className={styles.item3x3}>
                    <img
                      className={styles.company}
                      src={`assets/companies/${index + 1}.png`}
                    />
                  </a>
                ))}
              </div>
            </div>
            <div
              className={classNames('col col--5', styles['section-content'])}
            >
              <Subtitle>References</Subtitle>
              <Heading className={styles['heading-white']}>
                Who uses uniforms
              </Heading>
              <p className={classNames(styles.text, styles.paragraph)}>
                Our package has been used in several projects worldwide. From
                small to the corporate business solutions and well-known
                enterprises. Companies trusted us in the development of both
                simple forms and sophisticated management systems.
              </p>
              <div className={styles['center-if-sm']}>
                <Button to="mailto:hello@uniforms.tools">
                  Add your company
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
