import _capitalize from 'lodash/capitalize';

export default function toHumanLabel(
  string: string,
  separator: RegExp = /(?=[A-Z])/
): string {
  const genericName: string = string
    .split(separator)
    .join(' ')
    .replace(/\s+/, ' ');
  const capitalizedLabel: string = _capitalize(genericName);
  return capitalizedLabel;
}
