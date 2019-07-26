import React, { useState, useEffect } from 'react';
import { Star, GitBranch, Download } from 'react-feather';

import { Row } from '../Grid';
import styles from './Stats.module.css';

function StatisticItem({ children, value }) {
  return (
    <div className={styles.item}>
      <div className={styles.number}>{value}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

function useStats() {
  const [stars, setStars] = useState(null);
  const [forks, setForks] = useState(null);
  const [downloads, setDownloads] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/vazco/uniforms')
      .then(res => res.json())
      // eslint-disable-next-line camelcase
      .then(({ stargazers_count, forks_count }) => {
        setStars(stargazers_count.toLocaleString('en-US'));
        setForks(forks_count.toLocaleString('en-US'));
      });
  }, [stars, forks]);

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/last-month/uniforms')
      .then(res => res.json())
      .then(({ downloads }) => setDownloads(downloads.toLocaleString('en-US')));
  }, [downloads]);

  return {
    stars,
    forks,
    downloads
  };
}

export default function Stats() {
  const { stars, forks, downloads } = useStats();
  return (
    <Row>
      <div style={{ width: '100%' }}>
        <div className={styles.stats}>
          <StatisticItem value={stars}>
            <a href="https://github.com/vazco/uniforms/stargazers">
              <Star fill="var(--ifm-link-color)" /> Stars
            </a>
          </StatisticItem>
          <StatisticItem value={forks}>
            <a href="https://github.com/vazco/uniforms/network/members">
              <GitBranch color="var(--ifm-link-color)" /> Forks
            </a>
          </StatisticItem>
          <StatisticItem value={downloads}>
            <a href="https://www.npmjs.com/package/uniforms">
              <Download /> Downloads
            </a>
          </StatisticItem>
        </div>
      </div>
    </Row>
  );
}
