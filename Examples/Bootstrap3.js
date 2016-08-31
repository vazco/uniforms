import React      from 'react';
import {AutoForm} from 'uniforms-bootstrap3';

import Common from './common';

const Bootstrap3 = () =>
    <Common component={AutoForm}>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" />
    </Common>
;

export default Bootstrap3;
