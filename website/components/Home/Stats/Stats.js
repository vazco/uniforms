import React, { useState, useEffect } from 'react';
import { Star, GitBranch, Download } from 'react-feather';
import pick from 'lodash/pick';

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

function cachedFetch(key, url, properties) {
  const dataKey = `__cached-fetch-${key}`;
  const timeKey = `__time__cached-fetch-${key}`;
  const lastUpdated = localStorage.getItem(timeKey);
  const value = localStorage.getItem(dataKey);
  if (value && lastUpdated && lastUpdated > Date.now()) {
    return Promise.resolve(JSON.parse(value));
  }
  return fetch(url)
    .then(res => res.json())
    .then(data => (properties ? pick(data, properties) : data))
    .then(data => {
      localStorage.setItem(dataKey, JSON.stringify(data));
      localStorage.setItem(timeKey, Date.now() + 2 * 60 * 1000);
      return data;
    });
}

function useStats() {
  const [stars, setStars] = useState(null);
  const [forks, setForks] = useState(null);
  const [downloads, setDownloads] = useState(null);

  useEffect(() => {
    cachedFetch('github', 'https://api.github.com/repos/vazco/uniforms', [
      'stargazers_count',
      'forks_count'
    ])
      // eslint-disable-next-line camelcase
      .then(({ stargazers_count, forks_count }) => {
        setStars(stargazers_count.toLocaleString('en-US'));
        setForks(forks_count.toLocaleString('en-US'));
      });
  }, [stars, forks]);

  useEffect(() => {
    const today = new Date().toISOString().replace(/T.*/, '');
    cachedFetch(
      'npm',
      `https://api.npmjs.org/downloads/point/2016-01-01:${today}/uniforms`,
      ['downloads']
    ).then(({ downloads }) => setDownloads(downloads.toLocaleString('en-US')));
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
