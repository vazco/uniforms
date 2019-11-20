import { gridClassName } from 'uniforms-bootstrap4';

test('gridClassName - object', () => {
  expect(gridClassName({ md: 3 }, 'input')).toBe('col-9 col-md-9');
  expect(gridClassName({ md: 5 }, 'input')).toBe('col-7 col-md-7');
  expect(gridClassName({ md: 7 }, 'input')).toBe('col-5 col-md-5');
  expect(gridClassName({ md: 9 }, 'input')).toBe('col-3 col-md-3');
  expect(gridClassName({ md: 3, xs: 2 }, 'input')).toBe('col-10 col-md-9');
  expect(gridClassName({ md: 5, xs: 4 }, 'input')).toBe('col-8 col-md-7');
  expect(gridClassName({ md: 7, xs: 6 }, 'input')).toBe('col-6 col-md-5');
  expect(gridClassName({ md: 9, xs: 8 }, 'input')).toBe('col-4 col-md-3');
  expect(gridClassName({ sm: 11, md: 9, xs: 8, xl: 2, lg: 5 }, 'input')).toBe(
    'col-4 col-sm-1 col-md-3 col-lg-7 col-xl-10',
  );
  expect(gridClassName({ xl: 2, lg: 5, md: 9, sm: 11, xs: 8 }, 'input')).toBe(
    'col-4 col-sm-1 col-md-3 col-lg-7 col-xl-10',
  );
  expect(gridClassName({ lg: 9, xs: 8, md: 2, xl: 5 }, 'input')).toBe(
    'col-4 col-md-10 col-lg-3 col-xl-7',
  );
  expect(gridClassName({ xl: 9, lg: 2, md: 5 }, 'input')).toBe(
    'col-7 col-md-7 col-lg-10 col-xl-3',
  );

  expect(gridClassName({ md: 3 }, 'label')).toBe('col-3 col-md-3');
  expect(gridClassName({ md: 5 }, 'label')).toBe('col-5 col-md-5');
  expect(gridClassName({ md: 7 }, 'label')).toBe('col-7 col-md-7');
  expect(gridClassName({ md: 9 }, 'label')).toBe('col-9 col-md-9');
  expect(gridClassName({ md: 3, xs: 2 }, 'label')).toBe('col-2 col-md-3');
  expect(gridClassName({ md: 5, xs: 4 }, 'label')).toBe('col-4 col-md-5');
  expect(gridClassName({ md: 7, xs: 6 }, 'label')).toBe('col-6 col-md-7');
  expect(gridClassName({ md: 9, xs: 8 }, 'label')).toBe('col-8 col-md-9');
  expect(gridClassName({ sm: 11, md: 9, xs: 8, xl: 2, lg: 5 }, 'label')).toBe(
    'col-8 col-sm-11 col-md-9 col-lg-5 col-xl-2',
  );
  expect(gridClassName({ xl: 2, lg: 5, md: 9, sm: 11, xs: 8 }, 'label')).toBe(
    'col-8 col-sm-11 col-md-9 col-lg-5 col-xl-2',
  );
  expect(gridClassName({ lg: 9, xs: 8, md: 2, xl: 5 }, 'label')).toBe(
    'col-8 col-md-2 col-lg-9 col-xl-5',
  );
  expect(gridClassName({ xl: 9, lg: 2, md: 5 }, 'label')).toBe(
    'col-5 col-md-5 col-lg-2 col-xl-9',
  );

  expect(gridClassName({ lg: 3 }, 'label')).toBe('col-3 col-lg-3');
  expect(gridClassName({ lg: 5 }, 'label')).toBe('col-5 col-lg-5');
  expect(gridClassName({ lg: 7 }, 'label')).toBe('col-7 col-lg-7');
  expect(gridClassName({ lg: 9 }, 'label')).toBe('col-9 col-lg-9');

  expect(gridClassName({ xl: 3 }, 'label')).toBe('col-3 col-xl-3');
  expect(gridClassName({ xl: 5 }, 'label')).toBe('col-5 col-xl-5');
  expect(gridClassName({ xl: 7 }, 'label')).toBe('col-7 col-xl-7');
  expect(gridClassName({ xl: 9 }, 'label')).toBe('col-9 col-xl-9');
});

test('gridClassName - number', () => {
  expect(gridClassName(3, 'input')).toBe('col-9');
  expect(gridClassName(3, 'label')).toBe('col-3');
  expect(gridClassName(5, 'input')).toBe('col-7');
  expect(gridClassName(5, 'label')).toBe('col-5');
});

test('gridClassName - number (string)', () => {
  expect(gridClassName('3', 'input')).toBe('col-9');
  expect(gridClassName('3', 'label')).toBe('col-3');
  expect(gridClassName('5', 'input')).toBe('col-7');
  expect(gridClassName('5', 'label')).toBe('col-5');
});

test('gridClassName - string', () => {
  expect(gridClassName('col-9 col-md-9')).toBe('col-9 col-md-9');
  expect(gridClassName('col-3 col-md-3')).toBe('col-3 col-md-3');
  expect(gridClassName('col-7 col-md-7')).toBe('col-7 col-md-7');
  expect(gridClassName('col-5 col-md-5')).toBe('col-5 col-md-5');
});
