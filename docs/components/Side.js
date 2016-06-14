import React from 'react';

import pages from '..';

const Menu = ({route, topics = pages}) =>
    <ol>
        {topics.map(({href, name, topics}) =>
            <li key={name}>
                <a href={href} className={href === route ? 'active' : null}>
                    {name.replace(/.*? - /, '')}
                </a>

                {!!topics && (
                    <Menu route={route} topics={topics} />
                )}
            </li>
        )}
    </ol>
;

const Side = ({route}) =>
    <nav className="side-wrapper">
        <section className="side">
            <Menu route={route} />
        </section>
    </nav>
;

export default Side;
