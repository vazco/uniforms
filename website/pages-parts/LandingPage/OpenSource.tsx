import React, { ComponentType } from 'react';
import classNames from 'classnames';
import { Download, GitBranch, Star } from 'react-feather';

import styles from '../../index.module.css';
import { Badge } from '../../components/Badge';
import { Heading } from '../../components/Heading';
import { useStats } from '../../lib/stats';

export function OpenSource() {
  const { stars, forks, downloads } = useStats();
  return (
    <div className="section text--center">
      <p
        className={classNames(
          styles.centered,
          styles.text,
          styles['heading-helper'],
        )}
      >
        Always Open Source.
      </p>
      <Heading>
        Trusted by GitHub
        <br />
        community
      </Heading>
      <div className={classNames('row', styles.badges)}>
        <Badge
          border={1}
          color="#723CFF"
          icon={Star}
          number={stars}
          text="Stars"
          to="https://github.com/vazco/uniforms/stargazers"
        />
        <Badge
          border={2}
          color="#3FBBFE"
          icon={GitBranch}
          number={forks}
          text="Forks"
          to="https://github.com/vazco/uniforms/network/members"
        />
        <Badge
          border={3}
          color="#1FD898"
          icon={Download}
          number={downloads}
          text="Downloads"
          to="https://www.npmjs.com/package/uniforms"
        />
      </div>
    </div>
  );
}
