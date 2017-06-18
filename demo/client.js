import 'babel-polyfill';

import tapEvent from 'react-tap-event-plugin';
import {mount}  from 'react-mounter';

import {DocHead}    from 'meteor/kadira:dochead';
import {FlowRouter} from 'meteor/kadira:flow-router';

import Application from '/imports/components/Application';

tapEvent();

FlowRouter.route('/', {
    action () {
        DocHead.setTitle('uniforms');
        DocHead.addMeta({charset: 'utf-8'});
        DocHead.addMeta({'http-equiv': 'x-ua-compatible', content: 'ie=edge'});
        DocHead.addMeta({name: 'viewport', content: 'width=device-width, initial-scale=1'});

        mount(Application, {}, {rootId: 'application'});
    }
});

FlowRouter.notFound = {triggersEnter: [(context, redirect) => redirect('/')]};
