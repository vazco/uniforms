import React      from 'react';
import {AutoForm} from 'uniforms-bootstrap4';

import Common from './common';

const Bootstrap4 = () =>
    <Common component={AutoForm}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" />
    </Common>
;

export default Bootstrap4;
