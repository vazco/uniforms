module.exports = {
  '**/*.css': ['stylelint'],
  '**/*.{js,ts,tsx}': ['eslint'],
  '**/*.{json,md,mdx,yml}': ['prettier --check'],
  '**/*.{ts,tsx}': () => 'tsc --noEmit --project .'
};
