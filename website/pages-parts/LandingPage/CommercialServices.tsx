import classNames from 'classnames';
import React from 'react';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import styles from '../../index.module.css';

const forminerLink =
  'https://forminer.com/?utm_source=uniforms&utm_medium=Section_CTA&utm_campaign=Forminer_uniforms_section_CTA&utm_id=Forminer_uniforms_section';

export function CommercialServices() {
  return (
    <div className={classNames('section', styles.example)}>
      <div
        className={classNames(
          'row',
          styles['blue-accent'],
          styles['reverse-wrap'],
        )}
      >
        <div className="col">
          <div
            className={classNames(
              styles['preview-border'],
              styles['preview'],
              styles['no-padding'],
            )}
          >
            <a
              className={styles['flex-center']}
              href={forminerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                alt="Forminer UI"
                className={styles.company}
                src="assets/forminer-screenshot.png"
              />
            </a>
          </div>
        </div>

        <div className="col col--4">
          <div
            className={classNames(
              styles['solid-border-box'],
              styles['simple-yet-powerful-text'],
            )}
          >
            <h3
              className={classNames(
                styles.centered,
                styles.text,
                styles['heading-helper'],
              )}
            >
              Commercial support
            </h3>
            <Heading>Forminer</Heading>
            <p
              className={classNames(
                styles.centered,
                styles.text,
                styles['heading-helper'],
              )}
            >
              A commercial implementation of uniforms, which can save you up to
              1500 hours of work.
            </p>
            <ul className={classNames(styles['commercial-bullets'])}>
              <li>
                <b>Ideal for building no-code tools</b> - thanks to a
                schema-first approach
              </li>
              <li>
                <b>Package</b> - easy to integrate with your project and design
                system
              </li>
              <li>
                <b>Powerful solution</b> - custom fields, full state machine
              </li>
              <li>
                <b>Good level of support</b> - based on our popular OS solution,
                uniforms
              </li>
            </ul>
            <div
              className={classNames(
                styles['flex-center'],
                styles['top-margin'],
              )}
            >
              <Button
                to={forminerLink}
                className={classNames(
                  styles.discussions,
                  styles['long-button'],
                )}
              >
                Check Forminer in action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
