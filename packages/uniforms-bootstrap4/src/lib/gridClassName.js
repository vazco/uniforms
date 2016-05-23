function gridClassNamePart (size, value, side) {
    return side === 'label'
        ? `col-${size}-${value}`
        : `col-${size}-${(12 - value)}`;
}

export default function gridClassName (grid, side) {
    if (!grid) {
        return '';
    }

    if (typeof grid === 'number') {
        // grid value is a number [1-11]
        // if grid=1, label.col-sm-1 & input.col-sm-11
        // if grid=2, label.col-sm-2 & input.col-sm-10
        // if grid=3, label.col-sm-3 & input.col-sm-9
        // if grid=4, label.col-sm-4 & input.col-sm-8
        return gridClassNamePart('sm', grid, side);
    }

    if (typeof grid === 'object') {
        // grid value is an object config
        // eg: { xs: 6, sm: 4, md: 3 }
        return Object.keys(grid).map((value, size) =>
            gridClassNamePart(size, value, side)
        );
    }
}

