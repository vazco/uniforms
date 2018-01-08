// @flow

export const SimpleSchema = {
    extendOptions () {},
    _makeGeneric (name: mixed) {
        if (typeof name !== 'string') {
            return null;
        }

        return name.replace(/\.[0-9]+(?=\.|$)/g, '.$');
    }
};
