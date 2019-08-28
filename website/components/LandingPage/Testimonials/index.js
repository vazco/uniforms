import React from 'react';
import classNames from 'classnames';

import Heading from '../common/Heading';
import styles from '../index.module.css';

function Testimonial({ who, company, position, description, mirror }) {
  return (
    <div className="col col--4">
      <div
        className={classNames(
          styles['border-dashed'],
          mirror
            ? styles['border-disable-top-right']
            : styles['border-disable-bottom-left']
        )}
      >
        <div
          className={classNames(
            styles.testimonial,
            styles['border-gradient'],
            mirror
              ? styles['border-disable-bottom-left']
              : styles['border-disable-top-right']
          )}
        >
          <h2>{who}</h2>
          <p>
            <b>{company}</b>
            <br />
            {position}
          </p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <div className={classNames('container', styles.section)}>
      <p className={classNames(styles.centered, styles['always-open-source'])}>
        Lorem ipsum dolor
      </p>
      <Heading centered>Testimonials</Heading>
      <div className={classNames('row', styles.testimonials)}>
        <Testimonial
          who="Florence Boyle"
          company="Saturn"
          position="Accountant"
          description="Donec vehicula, leo vulputate tincidunt pretium, mi erat tristique nisl, sed suscipit dui nulla quis felis. Cras consequat ligula eu dui consectetur cursus. Sed suscipit ac lorem eu luctus."
        />
        <Testimonial
          mirror
          who="Florence Boyle"
          company="Saturn"
          position="Accountant"
          description="Donec vehicula, leo vulputate tincidunt pretium, mi erat tristique nisl, sed suscipit dui nulla quis felis. Cras consequat ligula eu dui consectetur cursus. Sed suscipit ac lorem eu luctus."
        />
      </div>
    </div>
  );
}
