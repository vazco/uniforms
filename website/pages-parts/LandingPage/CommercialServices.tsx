import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import classNames from 'classnames';
import React from 'react';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Subtitle } from '../../components/Subtitle';
import styles from '../../index.module.css';

export function CommercialServices() {
  const context = useDocusaurusContext();
  const { email } = context.siteConfig.customFields;

  return (
    <div
      className={classNames(
        'hero hero--primary',
        styles['overflow-hidden'],
        styles.whyus,
      )}
    >
      <div className="container">
        <div className="section">
          <div className="row">
            <div
              className={classNames('col col--5', styles['section-content'])}
            >
              <Subtitle>Commercial support</Subtitle>
              <Heading className={styles['heading-white']}>
                Looking for more?
              </Heading>
              <p className={classNames(styles.text, styles.paragraph)}>
                uniforms are and always will be free, but we can bring you extra
                value with additional services:
              </p>
              <ul className={classNames(styles.text, styles.bullets)}>
                <li>Consulting</li>
                <li>Training and Code Reviews</li>
                <li>Custom software development</li>
                <li>Solutions built on top of uniforms&nbsp;➤</li>
              </ul>
              <div className={styles['center-if-sm']}>
                <Button to="https://www.vazco.eu/contact/">Contact us</Button>
              </div>
            </div>
            <div
              className={classNames(
                'col',
                styles['section-content'],
                styles['section-bgwhite'],
              )}
            >
              <span
                className={classNames(
                  styles['section-bgwhite-block'],
                  styles['section-bgwhite-block-right'],
                )}
              />
              <div
                className={classNames(
                  'row',
                  styles['blue-accent'],
                  styles.padding,
                )}
              >
                <div className="col">
                  <div
                    className={classNames(
                      styles['solid-border-box'],
                      styles['commercial-box'],
                    )}
                  >
                    <Heading>Drag & drop form builders</Heading>
                    <ul>
                      <li>
                        Allow your users to build forms quickly with drag and
                        drop
                      </li>
                      <li>Build low-code platforms quickly</li>
                      <li>
                        Use a trusted solution that supports heavy traffic
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className={classNames(
                  'row',
                  styles['green-accent'],
                  styles.padding,
                )}
              >
                <div className="col">
                  <div
                    className={classNames(
                      styles['solid-border-box'],
                      styles['commercial-box'],
                      styles['commercial-box-right'],
                    )}
                  >
                    <Heading>Custom BPM & RPA solutions</Heading>
                    <ul>
                      <li>Model business processes unique for your industry</li>
                      <li>
                        Create your workflows quickly without any problems
                      </li>
                      <li>Use the best UI/UX and modern tech stack</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
