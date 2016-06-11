import React from 'react';

const markdownForRoute = route =>
    require(`/docs${route.indexOf('/', 1) === -1 ? `${route}/index` : route}.md`).default
;

const View = ({route}) =>
    <section className="view">
        <section
            className="markdown-body"
            dangerouslySetInnerHTML={{__html: markdownForRoute(route)}}
        />
    </section>
;

export default View;
