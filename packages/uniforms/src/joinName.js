export default function joinName (...parts) {
    const name = parts.reduce(
        (parts, part) => part || part === 0
            ? parts.concat(typeof part === 'string' ? part.split('.') : part)
            : parts,
        []
    );

    return parts[0] === null
        ? name.map(part => part.toString())
        : name.join('.')
    ;
}
