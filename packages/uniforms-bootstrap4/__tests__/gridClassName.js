import gridClassName from 'uniforms-bootstrap4/gridClassName';

test('gridClassName - object', () => {
    expect(gridClassName({md: 3}, 'input')).toBe('col-9 col-md-9');
    expect(gridClassName({md: 5}, 'input')).toBe('col-7 col-md-7');
    expect(gridClassName({md: 7}, 'input')).toBe('col-5 col-md-5');
    expect(gridClassName({md: 9}, 'input')).toBe('col-3 col-md-3');
    expect(gridClassName({md: 3, xs: 2}, 'input')).toBe('col-10 col-md-9');
    expect(gridClassName({md: 5, xs: 4}, 'input')).toBe('col-8 col-md-7');
    expect(gridClassName({md: 7, xs: 6}, 'input')).toBe('col-6 col-md-5');
    expect(gridClassName({md: 9, xs: 8}, 'input')).toBe('col-4 col-md-3');

    expect(gridClassName({md: 3}, 'label')).toBe('col-3 col-md-3');
    expect(gridClassName({md: 5}, 'label')).toBe('col-5 col-md-5');
    expect(gridClassName({md: 7}, 'label')).toBe('col-7 col-md-7');
    expect(gridClassName({md: 9}, 'label')).toBe('col-9 col-md-9');
    expect(gridClassName({md: 3, xs: 2}, 'label')).toBe('col-2 col-md-3');
    expect(gridClassName({md: 5, xs: 4}, 'label')).toBe('col-4 col-md-5');
    expect(gridClassName({md: 7, xs: 6}, 'label')).toBe('col-6 col-md-7');
    expect(gridClassName({md: 9, xs: 8}, 'label')).toBe('col-8 col-md-9');
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
