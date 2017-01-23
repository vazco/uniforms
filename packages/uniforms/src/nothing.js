import React from 'react';

// React@0.14.x workaround
// https://github.com/vazco/uniforms/issues/42
// https://github.com/facebook/react/issues/5355
export default React.version.slice(0, 4) === '0.14' ? <noscript /> : null;
