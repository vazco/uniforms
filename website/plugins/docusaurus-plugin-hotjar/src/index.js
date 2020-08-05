// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = function () {
  return {
    name: 'docusaurus-plugin-hotjar',
    getClientModules() {
      return [path.resolve(__dirname, './hotjar')];
    },
  };
};
