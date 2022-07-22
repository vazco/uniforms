const Environment = require('jest-environment-jsdom-global');
/**
 * A custom environment to set the TextEncoder
 */
module.exports = class CustomTestEnvironment extends Environment {
  constructor(
    { globalConfig, projectConfig }: { globalConfig: any; projectConfig: any },
    context: any,
  ) {
    super({ globalConfig, projectConfig }, context);
    if (typeof this.global.TextEncoder === 'undefined') {
      const { TextEncoder } = require('util');
      this.global.TextEncoder = TextEncoder;
    }
  }
};
