import { useEffect, useState } from 'react';

function cacheKey(key: string) {
  return `__cached-fetch-${key}`;
}

function cacheGet(key: string) {
  try {
    const stored = localStorage.getItem(cacheKey(key));
    const { expires, data } = JSON.parse(stored ?? '');
    return { expired: !expires || expires < Date.now(), data };
  } catch (error) {
    return { expired: true, data: null };
  }
}

function cacheSet(key: string, data: {}, expires: number) {
  try {
    localStorage.setItem(cacheKey(key), JSON.stringify({ data, expires }));
  } catch (error) {
    // Nothing.
  }
}

function cached<T>(key: string, fallback: () => Promise<T>, expires = 0) {
  const { expired, data } = cacheGet(key);

  if (expired) {
    return fallback()
      .then(data => {
        cacheSet(key, data, expires);
        return data;
      })
      .catch(() => data || 0);
  }

  return Promise.resolve(data);
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function formatNumber(number: number) {
  return number.toLocaleString('en-US');
}

function dateRanges(from: Date, to: Date) {
  function nextMonth(d: Date) {
    d.setMonth(d.getMonth() + 1);
    return d;
  }

  const dates = [];
  while (from < to) {
    dates.push(`${formatDate(from)}:${formatDate(nextMonth(from))}`);
  }

  return dates;
}

function getNPMDownloadsInRange(range: string, expires?: number) {
  return cached(
    `npm-${range}`,
    () =>
      fetch(`https://api.npmjs.org/downloads/point/${range}/uniforms`)
        .then(response => response.json())
        .then(({ downloads }) => downloads || 0),
    expires,
  );
}

function getNPMDownloads(from: Date, to: Date) {
  const dates = dateRanges(from, to);
  const lastRange = dates.pop()!;

  const oneYear = 12 * 31 * 24 * 60 * 60 * 1000;
  const oneDay = 1 * 24 * 60 * 60 * 1000;

  return Promise.all(
    dates
      .map(range => getNPMDownloadsInRange(range, Date.now() + oneYear))
      .concat(getNPMDownloadsInRange(lastRange, Date.now() + oneDay)),
  ).then(sums => sums.reduce((a, b) => a + b, 0));
}

function getGitHubStats() {
  const twoMinutes = 2 * 60 * 1000;
  return cached(
    'github',
    () =>
      fetch('https://api.github.com/repos/vazco/uniforms')
        .then(response => response.json())
        .then(({ forks_count: forks, stargazers_count: stars }) => ({
          forks,
          stars,
        })),
    Date.now() + twoMinutes,
  );
}

export function useStats() {
  const [stars, setStars] = useState<string>();
  const [forks, setForks] = useState<string>();
  const [downloads, setDownloads] = useState<string>();

  useEffect(() => {
    getGitHubStats().then(({ forks, stars }) => {
      forks && setForks(formatNumber(forks));
      stars && setStars(formatNumber(stars));
    });
  }, [stars, forks]);

  useEffect(() => {
    const start = new Date('2016-04-01');
    const today = new Date();

    getNPMDownloads(start, today).then(downloads =>
      setDownloads(formatNumber(downloads)),
    );
  }, [downloads]);

  return { downloads, forks, stars };
}
