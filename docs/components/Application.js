import React from 'react';

import Side from './Side';
import View from './View';

const Application = ({route}) =>
    <main>
        <Side route={route} />
        <View route={route} />
    </main>
;

export default Application;
