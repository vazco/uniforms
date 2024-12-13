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

function cacheSet(key: string, data: unknown, expires: number) {
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

function getLastDayOfYear(date: Date) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + 1);
  newDate.setDate(newDate.getDate() - 1);
  return newDate;
}

function getYearRange(date: Date) {
  const lastDayOfMonth = getLastDayOfYear(date);
  return `${formatDate(date)}:${formatDate(lastDayOfMonth)}`;
}

function dateRanges(from: Date, to: Date) {
  const dates = [];
  while (from < to) {
    dates.push(getYearRange(from));
    from.setFullYear(from.getFullYear() + 1);
  }
  return dates;
}

/**
 * Queries are limited to at most 18 months of data. The earliest date for which data will be returned is January 10, 2015.
 * {@link https://github.com/npm/registry/blob/master/docs/download-counts.md#limits See limits}
 */
async function fetchNPMDownloadsInRange(range: string) {
  type NPMResponse = {
    downloads: number;
    start: string;
    end: string;
    package: string;
  };

  const response = await fetch(
    `https://api.npmjs.org/downloads/point/${range}/uniforms`,
  );
  const { downloads }: NPMResponse = await response.json();
  return downloads || 0;
}

function getNPMDownloadsInRange(range: string, expires?: number) {
  return cached(`npm-${range}`, () => fetchNPMDownloadsInRange(range), expires);
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
    const DATE_RANGE_START = '2015-01-01';
    const start = new Date(DATE_RANGE_START);
    const today = new Date();

    getNPMDownloads(start, today).then(downloads =>
      setDownloads(formatNumber(downloads)),
    );
  }, [downloads]);

  return { downloads, forks, stars };
}
