import Link from '@docusaurus/Link';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Star, GitBranch, Download } from 'react-feather';

import Heading from '../common/Heading';
import Oval from '../common/Oval';

import styles from '../index.module.css';

function Badge({ border, number, text, to, icon: Icon, color }) {
  return (
    <Link to={to} className={classNames(styles.badge)}>
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
    </Link>
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

function cacheSet(key, data, length = 120000) {
  const expires = Date.now() + length;
  try {
    localStorage.setItem(cacheKey(key), JSON.stringify({ data, expires }));
  } catch (error) {
    // Nothing.
  }
}

function cached(key, fallback, length) {
  const data = cacheGet(key);
  if (data) return Promise.resolve(data);

  return fallback().then(data => {
    cacheSet(key, data, length);
    return data;
  }, console.error);
}

function yyyymmdd(date) {
  return date.toISOString().slice(0, 10);
}

function dateRanges(from, to) {
  from = new Date(from);
  to = new Date(to);

  const dates = [yyyymmdd(from)];
  while (from < to) {
    dates.push(yyyymmdd(new Date(from.setMonth(from.getMonth() + 1))));
  }
  dates.concat([yyyymmdd(to)]);

  return dates
    .reduce((acc, curr, i, arr) => acc.concat(curr + ':' + arr[i + 1]), [])
    .slice(0, -1);
}

function getNPMDownloads(from, to) {
  const dates = dateRanges(from, to);

  return Promise.all(
    dates.map(range =>
      fetch(`https://api.npmjs.org/downloads/point/${range}/uniforms`)
        .then(response => response.json())
        .then(({ downloads }) => downloads || 0)
    )
  ).then(sums => sums.reduce((acc, curr) => acc + curr));
}

function getGitHubStats() {
  return fetch('https://api.github.com/repos/vazco/uniforms')
    .then(response => response.json())
    .then(({ stargazers_count: stars, forks_count: forks }) => ({
      stars,
      forks
    }));
}

function useStats() {
  const [stars, setStars] = useState(null);
  const [forks, setForks] = useState(null);
  const [downloads, setDownloads] = useState(null);

  useEffect(() => {
    cached('github', getGitHubStats).then(({ forks, stars }) => {
      setForks(forks.toLocaleString('en-US'));
      setStars(stars.toLocaleString('en-US'));
    });
  }, [stars, forks]);

  useEffect(() => {
    const todayDate = new Date();
    const memoizedMonths = 3;

    const start = '2015-01-01';
    const today = yyyymmdd(todayDate);
    const mid = yyyymmdd(
      new Date(todayDate.setMonth(todayDate.getMonth() - memoizedMonths))
    );

    Promise.all([
      cached(
        `npm-${start}--${mid}`,
        () => getNPMDownloads(start, mid),
        memoizedMonths * 31 * 24 * 60 * 60 * 1000
      ),
      cached(`npm-${mid}--${today}`, () => getNPMDownloads(mid, today))
    ])
      .then(([a, b]) => a + b)
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
          styles['heading-helper']
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
          to="https://github.com/vazco/uniforms/stargazers"
          text="Stars"
          border={1}
          number={stars}
          icon={Star}
          color="#723CFF"
        />
        <Badge
          to="https://github.com/vazco/uniforms/network/members"
          text="Forks"
          border={2}
          number={forks}
          icon={GitBranch}
          color="#3FBBFE"
        />
        <Badge
          to="https://www.npmjs.com/package/uniforms"
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
