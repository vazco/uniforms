import filterDOMProps from 'uniforms/filterDOMProps';

filterDOMProps.register('grid');

function gridClassNamePart (size, value, side) {
    const sizeInfix = size === 'xs' ? '' : `${size}-`;
    return side === 'label'
        ? `col-${sizeInfix}${value}`
        : `col-${sizeInfix}${(12 - value)}`;
}

function compareSizeClass (a, b) {
    if (a === 'xs') {
        return -1;
    }

    if (a === 'sm') {
        if (b === 'md') {
            return -1;
        }

        if (b === 'lg') {
            return -1;
        }

        if (b === 'xl') {
            return -1;
        }
    }

    if (a === 'md') {
        if (b === 'lg') {
            return -1;
        }

        if (b === 'xl') {
            return -1;
        }
    }

    if (a === 'lg') {
        if (b === 'xl') {
            return -1;
        }
    }

    return 1;
}

export default function gridClassName (grid, side) {
    // Example: 6
    if (typeof grid === 'number') {
        return gridClassNamePart('xs', grid, side);
    }

    // Example: '6'
    if (typeof grid === 'string' && !isNaN(parseInt(grid))) {
        return gridClassNamePart('xs', parseInt(grid), side);
    }

    // Example: 'col-md-6'
    if (typeof grid === 'string') {
        return grid;
    }

    // Example: {xs: 6, sm: 4, md: 3}
    if (typeof grid === 'object') {

        if (!grid['xs']) {
            grid['xs'] = grid['sm'] || grid['md'] || grid['lg'] || grid['xl'];
        }

        return Object.keys(grid)
            .sort(compareSizeClass)
            .map(size => gridClassNamePart(size, grid[size], side)).join(' ');
    }

    return '';
}
