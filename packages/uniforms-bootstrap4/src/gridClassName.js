import filterDOMProps from 'uniforms/filterDOMProps';

filterDOMProps.register('grid');

function gridClassNamePart (size, value, side) {
    return `${gridClassNamePartNew(value, side)} ${gridClassNamePartOld(size, value, side)}`;
}

// bootstrap alpha > 5 now uses flexbox columns
function gridClassNamePartNew (value, side) {
    return side === 'label'
        ? `col-${value}`
        : `col-${(12 - value)}`;
}

// bootstrap alpha < 6 requires col-size
function gridClassNamePartOld (size, value, side) {
    return side === 'label'
        ? `col-${size}-${value}`
        : `col-${size}-${(12 - value)}`;
}

export default function gridClassName (grid, side) {
    // Example: 6
    if (typeof grid === 'number') {
        return gridClassNamePart('sm', grid, side);
    }

    // Example: '6'
    if (typeof grid === 'string' && !isNaN(parseInt(grid))) {
        return gridClassNamePart('sm', parseInt(grid), side);
    }

    // Example: 'col-md-6'
    if (typeof grid === 'string') {
        return grid;
    }

    // Example: {xs: 6, sm: 4, md: 3}
    if (typeof grid === 'object') {
        return Object.keys(grid).map(size => gridClassNamePart(size, grid[size], side)).join(' ');
    }

    return '';
}
