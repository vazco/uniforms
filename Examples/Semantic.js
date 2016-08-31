import React      from 'react';
import {AutoForm} from 'uniforms-semantic';

import Common from './common';

const Semantic = () =>
    <Common component={AutoForm}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.1.8/semantic.min.css" />
    </Common>
;

export default Semantic;
