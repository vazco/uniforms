import React, { useState, useEffect } from 'react';
import {
  GitHub,
  Package,
  GitBranch,
  Star,
  Hash,
  Download
} from 'react-feather';

import { Row } from '../Grid';
import styles from './Stats.module.css';

function StatisticItem({ children, title, icon }) {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      {title && <h2>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default function Stats() {
  const color = '#fefefe';
  const [stars, setStars] = useState(null);
  const [forks, setForks] = useState(null);
  const [downloads, setDownloads] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/vazco/uniforms')
      .then(res => res.json())
      // eslint-disable-next-line camelcase
      .then(({ stargazers_count, forks_count }) => {
        setStars(stargazers_count);
        setForks(forks_count);
      });
  }, [stars, forks]);

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/last-week/uniforms')
      .then(res => res.json())
      .then(({ downloads }) => setDownloads(downloads));
  }, [downloads]);

  return (
    <Row>
      <div style={{ width: '100%' }}>
        <div className={styles.stats}>
          <StatisticItem
            title="GitHub"
            icon={<GitHub size={50} color={color} />}
          >
            <Star
              fill={'var(--ifm-link-color)'}
              color={'var(--ifm-link-color)'}
            />
            {stars} stars
          </StatisticItem>
          <StatisticItem
            title="GitHub"
            icon={<GitBranch size={50} color={color} />}
          >
            <Hash color={'var(--ifm-link-color)'} />
            {forks} forks
          </StatisticItem>
          <StatisticItem title="NPM" icon={<Package size={50} color={color} />}>
            <Download color={'var(--ifm-link-color)'} />
            {downloads} weekly
          </StatisticItem>
        </div>
      </div>
    </Row>
  );
}
