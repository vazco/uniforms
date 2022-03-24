import classNames from 'classnames';
import React from 'react';

import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import styles from '../../index.module.css';

export function CommercialServices() {
  return (
    <div className={classNames('section', styles.example)}>
      <div
        className={classNames(
          'row',
          styles['blue-accent'],
          styles['reverse-wrap']
        )}
      >
        <div className="col">
          <div
            className={classNames(
              styles['preview-border'],
              styles['preview'],
              styles['no-padding']
            )}
          >
            <iframe
              className={classNames(styles['iframe-form-builder'])}
              title="form-builder-iframe"
              src="https://vazco.github.io/uniforms-form-builder/#N4Igtg9gJgpgNiAXKAbgSxgdwM5INqgDGEYADhAHYwUAuSIAggK40QBiGcUIANCAGacoASW6IQARl4g4AQwBG8ehwBO2GgAIKssDGnoso-lIC-PIiXJVa9Zqw7xufQY6PiATNLmKE4hgHM9PgNMNxBPMwsySmo6PxZ2IWkXLjCAZi8FJXEAcWpYFX0MULEQDMiQYmjrOMYEhy5koTCAFkyfegARWRoYDQh-DRoVWTQKMf8iw1K2iqqrWNt6pOdm0oBWduyQACE0FRoACyhZAE8pkvpNkwBdPjlTiBZcRAIQbV16AAVZQI0pe5nJ5xUAAazGpQAwpQaKMqIU-IRDmguCpqPgwRDlCsQCEwgCZECWGEIuYQOCKKUGk5ccUSZlHsTSuUyRSoTC4TAEZVkaj0a9MZTsY4LvTAYyaGFrqyseJqaLSgSHsCwgA2EAVNnCxrBOnMhkq0oAdg1dxANFOpD04gAMmh1NJiBRBJNkLjZCo0LIbOJDhBPQAvDkIMyEiWtDUyoVynF4mYGpn0AAckcFVNjequCclpQAnKa-BarfQ7Q7EZQXUhUB6vT7cVyaGhCLIQ-LDcYNbc-NgkTAwLIMQI1h2-B9rUO1DQAHI6ILmy3j9SeiiTCopESlTyj2f0X5zovjihMMCKQpr4fiDLbz7iQKUrnSA_0JcTaTUY_4EAAWRbc7Yfd_EAbnPVx42vccTl6AB5fgABURjGV9CwXZ9hiQkB3zAT8v0oE5Tg0NJEAABiIjQvi_aRYKYGBsDw_5iNI8jpAAdRgKAqFos4NHcBiyIo4CyXXKVkn9ftakgmAAFpG0-cD6HkfYjjwx8UPEF8V1NUMKAgXoXmAEwTCAA"
            />
          </div>
        </div>

        <div className="col col--4">
          <div
            className={classNames(
              styles['solid-border-box'],
              styles['simple-yet-powerful-text']
            )}
          >
            <p
              className={classNames(
                styles.centered,
                styles.text,
                styles['heading-helper']
              )}
            >
              Commercial support
            </p>
            <Heading>Form Builder</Heading>
            <p
              className={classNames(
                styles.centered,
                styles.text,
                styles['heading-helper']
              )}
            >
              A commercial implementation of uniforms, which can save you up to
              1500 hours of work.
            </p>
            <ul>
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
            <div className="text--center">
              <Button to="https://www.vazco.eu/form-builder">See more</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
