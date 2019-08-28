import React from 'react';
import classNames from 'classnames';
import { Star, GitBranch, Download } from 'react-feather';

import Heading from '../common/Heading';
import Oval from '../common/Oval';
import styles from '../index.module.css';

function Badge({ border, number, text, icon: Icon, color }) {
  return (
    <div className={classNames(styles.badge)}>
      <img
        className={styles['badge-image']}
        src={`assets/border-0${border}.svg`}
      />
      {Icon && (
        <Oval className={styles['top-right-corner']}>
          <Icon color={color} />
        </Oval>
      )}
      <div className={classNames(styles['badge-centered'], styles.centered)}>
        <div style={{ color }} className={styles['badge-number']}>
          {number}
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
}

export default function OpenSource() {
  return (
    <div className={classNames('container', styles.section)}>
      <p className={classNames(styles.centered, styles['always-open-source'])}>
        Always Open Source.
      </p>
      <Heading centered>Trusted by GitHub community</Heading>
      <div className="row">
        <Badge
          text="Stars"
          border={1}
          number={740}
          icon={Star}
          color="#723CFF"
        />
        <Badge
          text="Forks"
          border={2}
          number={131}
          icon={GitBranch}
          color="#3FBBFE"
        />
        <Badge
          text="Downloads"
          border={3}
          number={'108,604'}
          icon={Download}
          color="#1FD898"
        />
      </div>
    </div>
  );
}
