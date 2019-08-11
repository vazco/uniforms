const fs = require('fs');
const jest = require('babel-jest');
const path = require('path');

const configPath = path.resolve(__dirname, '..', '.babelrc.json');
const config = JSON.parse(fs.readFileSync(configPath));

module.exports = jest.createTransformer(config);
