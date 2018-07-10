const URL_KEYS = ['preset', 'props',  'theme'];

export const updateQuery = state => {
    const query = URL_KEYS.map(key => {
        if (!state[key]) {
            return null;
        }

        let value = state[key];

        if (key === 'props') {
            try {
                value = JSON.stringify(value);
            } catch (_) {
                value = null;
            }
        }

        return key + '=' + window.encodeURIComponent(value);
    })
        .filter(Boolean)
        .join('&');

    window.location.hash = '?' + query;
};

const mergeDefinedKeys = (raw, keys, target) => {
    keys.forEach(key => {
        if (raw[key] !== null) {
            target[key] = raw[key];
        }
    });
};

export const parseQuery = () => {
    const raw = document.location.hash
        .replace(/^#\?/, '')
        .split('&')
        .reduce((reduced, pair) => {
            const pieces = pair.split('=');

            const name = window.decodeURIComponent('' + pieces[0]);

            let value = window.decodeURIComponent('' + pieces[1]);

            if (value === 'true' || value === 'false') {
                value = value === 'true';
            }

            if (name === 'props') {
                try {
                    reduced[name] = JSON.parse(value);
                } catch (_) {
                    reduced[name] = null;
                }

            } else {
                reduced[name] = value;
            }

            return reduced;
        }, {});

    const state = {};

    mergeDefinedKeys(raw, URL_KEYS, state);

    return state;
};
