import React, { useState, useEffect } from 'react';
import { Star, GitBranch, Download } from 'react-feather';
import pick from 'lodash/pick';
import 'es6-promise/auto';
import 'universal-fetch';

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
  try {
    const cache = JSON.parse(localStorage.getItem(dataKey)) || {};
    const { expires, data } = cache;
    if (expires > Date.now()) {
      return Promise.resolve(data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return fetch(url)
    .then(response => response.json())
    .then(data => (properties ? pick(data, properties) : data))
    .then(data => {
      const twoMinutesLater = Date.now() + 2 * 60 * 1000;
      localStorage.setItem(
        dataKey,
        JSON.stringify({ expires: twoMinutesLater, data })
      );
      return data;
    })
    .catch(console.error);
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
    const today = new Date().toISOString().slice(0, 10);
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
