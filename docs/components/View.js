import React from 'react';

const markdownForRoute = route => {
    const path = `/docs${route.indexOf('/', 1) === -1 ? `${route}/index` : route}`;
    const part = require(path).default;

    if (typeof part === 'string') {
        return (
            <section
                className="markdown-body"
                dangerouslySetInnerHTML={{__html: part}}
            />
        );
    }

    return React.createElement(part);
};

const View = ({route}) =>
    <section className="view">
        {markdownForRoute(route)}
    </section>
;

export default View;
