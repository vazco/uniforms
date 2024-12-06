import classNames from 'classnames';
import React from 'react';
import { Download, GitBranch, Star } from 'react-feather';

import { Badge } from '../../components/Badge';
import { Heading } from '../../components/Heading';
import styles from '../../css/index.module.css';
import { useStats } from '../../lib/stats';

export function OpenSource() {
  const { stars, forks, downloads } = useStats();
  return (
    <div className="section text--center">
      <h2
        className={classNames(
          styles.centered,
          styles.text,
          styles['heading-helper'],
        )}
      >
        Always Open Source.
      </h2>
      <Heading>
        React form library <br /> trusted by GitHub community
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
