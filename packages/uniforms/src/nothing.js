// @flow

import React from 'react';

// React < 15 workaround
// https://github.com/vazco/uniforms/issues/42
// https://github.com/facebook/react/issues/5355
export default (parseInt(React.version, 10) < 15 ? <noscript /> : null);
