export default function joinName (...names) {
    const name = names
        .filter(name => name || name === 0)
        .reduce((names, name) => names.concat(name), [])
        .map(name => name.toString());

    return names[0] === null ? name : name.join('.');
}
