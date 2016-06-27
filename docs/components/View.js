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

        <a href="https://github.com/vazco/uniforms">
            <img style={{position: 'absolute', top: 0, right: 0, border: 0}} src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" />
        </a>
    </section>
;

export default View;
