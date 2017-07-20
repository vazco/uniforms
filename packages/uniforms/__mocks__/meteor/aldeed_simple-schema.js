export const SimpleSchema = {
    extendOptions () {},
    _makeGeneric (name) {
        if (typeof name !== 'string') {
            return null;
        }

        return name.replace(/\.[0-9]+(?=\.|$)/g, '.$');
    }
};
