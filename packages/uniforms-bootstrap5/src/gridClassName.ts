function gridClassNamePart(
  size: string,
  value: number,
  side?: 'input' | 'label',
) {
  const sizeInfix = size === 'xs' ? '' : `${size}-`;
  return side === 'label'
    ? `col-${sizeInfix}${value}`
    : `col-${sizeInfix}${12 - value}`;
}

type GridSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
const gridOrder = { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 };

function compareSizeClass(a: GridSize, b: GridSize) {
  return gridOrder[a] - gridOrder[b];
}

export default function gridClassName(
  grid?: number | string | Partial<Record<GridSize, number>>,
  side?: 'input' | 'label',
) {
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
    if (!grid.xs) {
      grid = {
        xs: grid.sm || grid.md || grid.lg || grid.xl || grid.xxl,
        ...grid,
      };
    }

    return (
      (Object.keys(grid) as GridSize[])
        .sort(compareSizeClass)
        // @ts-expect-error Weird type refinement problem.
        .map(size => gridClassNamePart(size, grid[size], side))
        .join(' ')
    );
  }

  return '';
}
