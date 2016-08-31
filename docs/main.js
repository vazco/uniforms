import {mount} from 'react-mounter';

import {Meteor}     from 'meteor/meteor';
import {DocHead}    from 'meteor/kadira:dochead';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';

import Application from '/components/Application';

if (Meteor.isServer) {
    FlowRouter.setPageCacheTimeout(100000);
    FlowRouter.setDeferScriptLoading(true);
}

const onTheme  = theme  => FlowRouter.setQueryParams({theme});
const onSchema = schema => FlowRouter.setQueryParams({schema});

FlowRouter.route('/', {
    action (params, {schema, theme}) {
        if (Meteor.isServer && schema) {
            schema = decodeURIComponent(schema);
        }

        DocHead.setTitle('uniforms');
        DocHead.addMeta({charset: 'utf-8'});
        DocHead.addMeta({'http-equiv': 'x-ua-compatible', content: 'ie=edge'});
        DocHead.addMeta({name: 'viewport', content: 'width=device-width, initial-scale=1'});

        mount(Application, {schema, theme, onSchema, onTheme}, {rootId: 'application'});
    }
});

FlowRouter.notFound = {
    triggersEnter: [(context, redirect) => redirect('/')]
};
