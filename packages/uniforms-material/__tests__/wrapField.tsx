import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';
import { wrapField } from 'uniforms-material';

import mount from './_mount';

test('<wrapField> - renders wrapper', () => {
  const Element = () => wrapField({}, <div />);
  const wrapper = mount(<Element />);

  expect(wrapper.find(FormControl)).toHaveLength(1);
});

test('<wrapField> - renders wrapper with helper text', () => {
  const Element = () => wrapField({ helperText: 'Helper text' }, <div />);
  const wrapper = mount(<Element />);

  expect(wrapper.find(FormHelperText).text()).toBe('Helper text');
});

test('<wrapField> - renders wrapper with error', () => {
  const Element = () =>
    wrapField(
      {
        showInlineError: true,
        error: new Error(),
        errorMessage: 'Error message',
      },
      <div />,
    );
  const wrapper = mount(<Element />);

  expect(wrapper.find(FormControl).prop('error')).toBe(true);
  expect(wrapper.find(FormHelperText).text()).toBe('Error message');
});
