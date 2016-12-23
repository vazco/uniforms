export default function joinName (...names) {
    const name = names
        .filter(name => name || name === 0)
        .map(name => name.split ? name.split('.') : name)
        .reduce((names, name) => names.concat(name), [])
        .map(name => name.toString());

    return names[0] === null ? name : name.join('.');
}
