import React    from 'react';
import {render} from 'react-dom';

import {DocHead} from 'meteor/kadira:dochead';

import Application from '/imports/components/Application';

const root = document.createElement('div');

document.body.appendChild(root);

DocHead.setTitle('uniforms');
DocHead.addMeta({charset: 'utf-8'});
DocHead.addMeta({'http-equiv': 'x-ua-compatible', content: 'ie=edge'});
DocHead.addMeta({name: 'viewport', content: 'width=device-width, initial-scale=1'});

render(<Application />, root);
