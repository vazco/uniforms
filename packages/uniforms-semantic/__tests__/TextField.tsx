import { screen } from '@testing-library/react';
import React from 'react';
import { TextField } from 'uniforms-semantic';
import { render } from 'uniforms/__suites__';

import createContext from './_createContext';
import mount from './_mount';

describe('@RTL - TextField tests', () => {
  test('<TextField> - renders a wrapper with unknown props', () => {
    const props = {
      'data-x': 'x',
      'data-y': 'y',
      'data-z': 'z',
    };
    render(<TextField name="x" {...props} />, { x: String });

    const wrapper = screen.getByRole('textbox').closest('div')?.parentElement;
    Object.entries(props).forEach(([key, value]) =>
      expect(wrapper).toHaveAttribute(key, value),
    );
  });

  test('<TextField> - renders a TextField with correct error text (specified)', () => {
    const errorMessage = 'Error';
    render(
      <TextField
        error={new Error()}
        name="x"
        showInlineError
        errorMessage={errorMessage}
      />,
      { x: String },
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('<TextField> - renders a TextField with correct error text (showInlineError=false)', () => {
    const errorMessage = 'Error';
    render(
      <TextField
        name="x"
        error={new Error()}
        showInlineError={false}
        errorMessage={errorMessage}
      />,
      { x: String },
    );

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  test('<TextField> - renders an icon', () => {
    const { container } = render(<TextField name="x" icon="small home" />, {
      x: String,
    });

    expect(container.querySelector('i')).toBeInTheDocument();
  });

  test('<TextField> - renders with a custom wrapClassName', () => {
    const testClassName = 'test-class-name';
    render(<TextField name="x" wrapClassName={testClassName} />, { x: String });

    expect(screen.getByRole('textbox').closest('div')).toHaveClass(
      testClassName,
    );
  });
});

test('<TextField> - renders an input', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
});

test('<TextField> - renders an input with correct disabled state', () => {
  const element = <TextField name="x" disabled />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('disabled')).toBe(true);
});

test('<TextField> - renders an input with correct readOnly state', () => {
  const element = <TextField name="x" readOnly />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('readOnly')).toBe(true);
});

test('<TextField> - renders an input with correct id (inherited)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('id')).toBeTruthy();
});

test('<TextField> - renders an input with correct id (specified)', () => {
  const element = <TextField name="x" id="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('id')).toBe('y');
});

test('<TextField> - renders an input with correct name', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('name')).toBe('x');
});

test('<TextField> - renders an input with correct placeholder', () => {
  const element = <TextField name="x" placeholder="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('placeholder')).toBe('y');
});

test('<TextField> - renders an input with correct type', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('type')).toBe('text');
});

test('<TextField> - renders an input with correct value (default)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('');
});

test('<TextField> - renders an input with correct value (model)', () => {
  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' } }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('y');
});

test('<TextField> - renders an input with correct value (specified)', () => {
  const element = <TextField name="x" value="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input')).toHaveLength(1);
  expect(wrapper.find('input').prop('value')).toBe('y');
});

test('<TextField> - renders an input which correctly reacts on change', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(
    wrapper.find('input').simulate('change', { target: { value: 'y' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<TextField> - renders an input which correctly reacts on change (empty)', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { onChange }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(
    wrapper.find('input').simulate('change', { target: { value: '' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', '');
});

test('<TextField> - renders an input which correctly reacts on change (same value)', () => {
  const onChange = jest.fn();

  const element = <TextField name="x" />;
  const wrapper = mount(
    element,
    createContext({ x: { type: String } }, { model: { x: 'y' }, onChange }),
  );

  expect(wrapper.find('input')).toHaveLength(1);
  expect(
    wrapper.find('input').simulate('change', { target: { value: 'y' } }),
  ).toBeTruthy();
  expect(onChange).toHaveBeenLastCalledWith('x', 'y');
});

test('<TextField> - renders a label', () => {
  const element = <TextField name="x" label="y" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('label')).toHaveLength(1);
  expect(wrapper.find('label').text()).toBe('y');
  expect(wrapper.find('label').prop('htmlFor')).toBe(
    wrapper.find('input').prop('id'),
  );
});

test('<TextField> - renders a wrapper with unknown props', () => {
  const element = <TextField name="x" data-x="x" data-y="y" data-z="z" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('div').at(0).prop('data-x')).toBe('x');
  expect(wrapper.find('div').at(0).prop('data-y')).toBe('y');
  expect(wrapper.find('div').at(0).prop('data-z')).toBe('z');
});

test('<TextField> - renders correct error text (specified)', () => {
  const error = new Error();
  const element = (
    <TextField name="x" error={error} showInlineError errorMessage="Error" />
  );
  const wrapper = mount(
    element,
    createContext({ x: { type: String, label: '' } }),
  );

  expect(wrapper.children().last().text()).toBe('Error');
});

test('<TextField> - renders correct error text (showInlineError=false)', () => {
  const error = new Error();
  const element = (
    <TextField
      name="x"
      error={error}
      showInlineError={false}
      errorMessage="Error"
    />
  );
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.children().last().text()).not.toBe('Error');
});

test('<TextField> - renders a icon', () => {
  const element = <TextField name="x" icon="small home" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('i')).toHaveLength(1);
});

test('<TextField> - renders a icon', () => {
  const element = <TextField name="x" iconLeft="small home" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('i')).toHaveLength(1);
});

test('<TextField> - renders with a custom wrapClassName', () => {
  const element = <TextField name="x" wrapClassName="test-class-name" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('.ui.input.test-class-name')).toHaveLength(1);
});

test('<TextField> - renders a input with autocomplete turned off', () => {
  const element = <TextField name="x" autoComplete="off" />;
  const wrapper = mount(element, createContext({ x: { type: String } }));

  expect(wrapper.find('input').prop('autoComplete')).toBe('off');
});
