import gridClassName from 'uniforms-bootstrap3/gridClassName';

test('gridClassName - object', () => {
  expect(gridClassName({ md: 3 }, 'input')).toBe('col-md-9');
  expect(gridClassName({ md: 5 }, 'input')).toBe('col-md-7');
  expect(gridClassName({ md: 7 }, 'input')).toBe('col-md-5');
  expect(gridClassName({ md: 9 }, 'input')).toBe('col-md-3');
  expect(gridClassName({ md: 3, xs: 2 }, 'input')).toBe('col-md-9 col-xs-10');
  expect(gridClassName({ md: 5, xs: 4 }, 'input')).toBe('col-md-7 col-xs-8');
  expect(gridClassName({ md: 7, xs: 6 }, 'input')).toBe('col-md-5 col-xs-6');
  expect(gridClassName({ md: 9, xs: 8 }, 'input')).toBe('col-md-3 col-xs-4');

  expect(gridClassName({ md: 3 }, 'label')).toBe('col-md-3');
  expect(gridClassName({ md: 5 }, 'label')).toBe('col-md-5');
  expect(gridClassName({ md: 7 }, 'label')).toBe('col-md-7');
  expect(gridClassName({ md: 9 }, 'label')).toBe('col-md-9');
  expect(gridClassName({ md: 3, xs: 2 }, 'label')).toBe('col-md-3 col-xs-2');
  expect(gridClassName({ md: 5, xs: 4 }, 'label')).toBe('col-md-5 col-xs-4');
  expect(gridClassName({ md: 7, xs: 6 }, 'label')).toBe('col-md-7 col-xs-6');
  expect(gridClassName({ md: 9, xs: 8 }, 'label')).toBe('col-md-9 col-xs-8');
});

test('gridClassName - number', () => {
  expect(gridClassName(3, 'input')).toBe('col-sm-9');
  expect(gridClassName(3, 'label')).toBe('col-sm-3');
  expect(gridClassName(5, 'input')).toBe('col-sm-7');
  expect(gridClassName(5, 'label')).toBe('col-sm-5');
});

test('gridClassName - number (string)', () => {
  expect(gridClassName('3', 'input')).toBe('col-sm-9');
  expect(gridClassName('3', 'label')).toBe('col-sm-3');
  expect(gridClassName('5', 'input')).toBe('col-sm-7');
  expect(gridClassName('5', 'label')).toBe('col-sm-5');
});

test('gridClassName - string', () => {
  expect(gridClassName('col-md-9')).toBe('col-md-9');
  expect(gridClassName('col-md-3')).toBe('col-md-3');
  expect(gridClassName('col-md-7')).toBe('col-md-7');
  expect(gridClassName('col-md-5')).toBe('col-md-5');
});
