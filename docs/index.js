import {mount} from 'react-mounter';

import {Meteor}     from 'meteor/meteor';
import {DocHead}    from 'meteor/kadira:dochead';
import {FlowRouter} from 'meteor/kadira:flow-router-ssr';

import Application from '/components/Application';

if (Meteor.isServer) {
    // Enable in production
    // FlowRouter.setPageCacheTimeout(...);
    FlowRouter.setDeferScriptLoading(true);
}

const pages = [];
const page = (group, topic) => {
    const slug = [group, topic].filter(part => !!part);
    const href = `/${slug.join('/')}`;
    const name = slug.join(' - ');

    if (topic) {
        pages[pages.length - 1].topics.push({href, name});
    } else {
        pages.push({href, name, topics: []})
    }

    FlowRouter.route(href, {
        action () {
            DocHead.setTitle(`${name.replace(/.*? - /, '')} | uniforms`);
            DocHead.addMeta({charset: 'utf-8'});
            DocHead.addMeta({'http-equiv': 'x-ua-compatible', content: 'ie=edge'});
            DocHead.addMeta({name: 'viewport', content: 'width=device-width, initial-scale=1'});

            mount(Application, {route: href}, {rootId: 'application'});
        }
    });
};

FlowRouter.notFound = {
    triggersEnter: [(context, redirect) => redirect(pages[0].href)]
};

page('Introduction');
page('Introduction', 'Motivation');
page('Introduction', 'Ecosystem');
page('Introduction', 'Examples');
page('Basics');
page('Basics', 'Installation');
page('Basics', 'AutoForm');
page('Basics', 'Schema');
page('Basics', 'Fields');
page('Advanced');
page('Advanced', 'Inheritance');
page('Advanced', 'Validation');

export default pages;
