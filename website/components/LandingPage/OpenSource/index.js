import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Star, GitBranch, Download } from 'react-feather';
import pick from 'lodash/pick';

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

  function dateRanges(from, to) {
    from = new Date(from);
    to = new Date(to);
    const length = to.getFullYear() - from.getFullYear();
    const dates = Array.from({ length })
      .map((_, i) => from.getFullYear() + i + '-01-01')
      .concat([to.toISOString().slice(0, 10)]);
    return dates
      .reduce((acc, curr, i, arr) => acc.concat(curr + ':' + arr[i + 1]), [])
      .slice(0, -1);
  }

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
    const from = '2014-01-01';
    const today = new Date().toISOString().slice(0, 10);
    const dates = dateRanges(from, today);

    Promise.all(
      dates.map(range =>
        cachedFetch(
          `npm-${range}`,
          `https://api.npmjs.org/downloads/point/${range}/uniforms`,
          ['downloads']
        ).then(({ downloads }) => downloads || 0)
      )
    )
      .then(sums => sums.reduce((acc, curr) => acc + curr))
      .then(downloads => setDownloads(downloads.toLocaleString('en-US')));
  }, [downloads]);

  return {
    stars,
    forks,
    downloads
  };
}

export default function OpenSource() {
  const { stars, forks, downloads } = useStats();
  return (
    <div className="container text--center">
      <p
        className={classNames(
          styles.centered,
          styles.text,
          styles['always-open-source']
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
          text="Stars"
          border={1}
          number={stars}
          icon={Star}
          color="#723CFF"
        />
        <Badge
          text="Forks"
          border={2}
          number={forks}
          icon={GitBranch}
          color="#3FBBFE"
        />
        <Badge
          text="Downloads"
          border={3}
          number={downloads}
          icon={Download}
          color="#1FD898"
        />
      </div>
    </div>
  );
}
