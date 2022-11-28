import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { wrapField } from 'uniforms-material';

import mount from './_mount';

it('<wrapField> - renders wrapper', () => {
  const element = wrapField({}, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(FormControl)).toHaveLength(1);
});

it('<wrapField> - renders wrapper with helper text', () => {
  const element = wrapField({ helperText: 'Helper text' }, <div />);
  const wrapper = mount(element);

  expect(wrapper.find(FormHelperText).text()).toBe('Helper text');
});

it('<wrapField> - renders wrapper with error', () => {
  const element = wrapField(
    {
      showInlineError: true,
      error: new Error(),
      errorMessage: 'Error message',
    },
    <div />,
  );
  const wrapper = mount(element);

  expect(wrapper.find(FormControl).prop('error')).toBe(true);
  expect(wrapper.find(FormHelperText).text()).toBe('Error message');
});
