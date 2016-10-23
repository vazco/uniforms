import React from 'react';

const style = links => links.map((link, index) => <link key={index} rel="stylesheet" href={link} />);
const styles = {
    bootstrap3: style([
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
    ]),

    bootstrap4: style([
        'https://cdnjs.cloudflare.com/ajax/libs/octicons/3.5.0/octicons.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.5/css/bootstrap.min.css'
    ]),

    semantic: style([
        'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.css'
    ]),

    unstyled: style([])
};

export function getStyles (theme) {
    return styles[theme] || styles[Object.keys(styles)[0]];
}
