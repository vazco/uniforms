import React, { useState, useEffect } from 'react';
import { Star, GitBranch, Download } from 'react-feather';
import pick from 'lodash/pick';
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

function cacheKey(key) {
  return `__cached-fetch-${key}`;
}

function cacheGet(key) {
  try {
    const { expires, data } = JSON.parse(localStorage.getItem(cacheKey(key)));
    if (expires > Date.now()) return data;
  } catch (error) {
    // Nothing.
  }
}

function cacheSet(key, data) {
  const twoMinutes = Date.now() + 2 * 60 * 1000;
  try {
    localStorage.setItem(
      cacheKey(key),
      JSON.stringify({ data, expires: twoMinutes })
    );
  } catch (error) {
    // Nothing.
  }
}

function cachedFetch(key, url, properties) {
  const data = cacheGet(key);
  if (data) return Promise.resolve(data);

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (properties) data = pick(data, properties);
      cacheSet(key, data);
      return data;
    }, console.error);
}

function useStats() {
  const [stars, setStars] = useState(null);
  const [forks, setForks] = useState(null);
  const [downloads, setDownloads] = useState(null);

  useEffect(() => {
    cachedFetch('github', 'https://api.github.com/repos/vazco/uniforms', [
      'stargazers_count',
      'forks_count'
    ]).then(({ forks_count: forks, stargazers_count: stars }) => {
      setForks(forks.toLocaleString('en-US'));
      setStars(stars.toLocaleString('en-US'));
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
