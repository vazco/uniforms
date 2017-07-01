import gridClassName from 'uniforms-bootstrap4/gridClassName';

test('gridClassName - object', () => {
    expect(gridClassName({md: 3}, 'input')).toBe('col-9 col-md-9');
    expect(gridClassName({md: 5}, 'input')).toBe('col-7 col-md-7');
    expect(gridClassName({md: 7}, 'input')).toBe('col-5 col-md-5');
    expect(gridClassName({md: 9}, 'input')).toBe('col-3 col-md-3');
    expect(gridClassName({md: 3, xs: 2}, 'input')).toBe('col-9 col-md-9 col-10 col-xs-10');
    expect(gridClassName({md: 5, xs: 4}, 'input')).toBe('col-7 col-md-7 col-8 col-xs-8');
    expect(gridClassName({md: 7, xs: 6}, 'input')).toBe('col-5 col-md-5 col-6 col-xs-6');
    expect(gridClassName({md: 9, xs: 8}, 'input')).toBe('col-3 col-md-3 col-4 col-xs-4');

    expect(gridClassName({md: 3}, 'label')).toBe('col-3 col-md-3');
    expect(gridClassName({md: 5}, 'label')).toBe('col-5 col-md-5');
    expect(gridClassName({md: 7}, 'label')).toBe('col-7 col-md-7');
    expect(gridClassName({md: 9}, 'label')).toBe('col-9 col-md-9');
    expect(gridClassName({md: 3, xs: 2}, 'label')).toBe('col-3 col-md-3 col-2 col-xs-2');
    expect(gridClassName({md: 5, xs: 4}, 'label')).toBe('col-5 col-md-5 col-4 col-xs-4');
    expect(gridClassName({md: 7, xs: 6}, 'label')).toBe('col-7 col-md-7 col-6 col-xs-6');
    expect(gridClassName({md: 9, xs: 8}, 'label')).toBe('col-9 col-md-9 col-8 col-xs-8');
});

test('gridClassName - number', () => {
    expect(gridClassName(3, 'input')).toBe('col-9 col-sm-9');
    expect(gridClassName(3, 'label')).toBe('col-3 col-sm-3');
    expect(gridClassName(5, 'input')).toBe('col-7 col-sm-7');
    expect(gridClassName(5, 'label')).toBe('col-5 col-sm-5');
});

test('gridClassName - number (string)', () => {
    expect(gridClassName('3', 'input')).toBe('col-9 col-sm-9');
    expect(gridClassName('3', 'label')).toBe('col-3 col-sm-3');
    expect(gridClassName('5', 'input')).toBe('col-7 col-sm-7');
    expect(gridClassName('5', 'label')).toBe('col-5 col-sm-5');
});

test('gridClassName - string', () => {
    expect(gridClassName('col-9 col-md-9')).toBe('col-9 col-md-9');
    expect(gridClassName('col-3 col-md-3')).toBe('col-3 col-md-3');
    expect(gridClassName('col-7 col-md-7')).toBe('col-7 col-md-7');
    expect(gridClassName('col-5 col-md-5')).toBe('col-5 col-md-5');
});
