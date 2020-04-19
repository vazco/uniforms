import React, { Component } from 'react';
import { QuickForm } from 'uniforms';
import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';

import mount from './_mount';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('QuickForm', () => {
  // @ts-ignore QuickForm cannot be a superclass.
  class TestForm<Model> extends QuickForm {
    getAutoField = () => () => <i className="auto" />;
    getErrorsField = () => () => <i className="errors" />;
    getSubmitField = () => () => <i className="submit" />;
  }

  const schema = new SimpleSchemaBridge({
    getDefinition: () => {},
    messageForError: () => {},
    objectKeys: () => ['a', 'b', 'c'],
    validator: () => {},
  });

  describe('when rendered with custom fields', () => {
    it('renders `AutoField` for each field', () => {
      const wrapper = mount<TestForm<any>>(<TestForm schema={schema} />);

      expect(wrapper.find('.auto').length).toBeGreaterThan(0);
    });

    it('renders `ErrorsField`', () => {
      const wrapper = mount<TestForm<any>>(<TestForm schema={schema} />);

      expect(wrapper.find('.errors').length).toBeGreaterThan(0);
    });

    it('renders `SubmitField`', () => {
      const wrapper = mount<TestForm<any>>(<TestForm schema={schema} />);

      expect(wrapper.find('.submit').length).toBeGreaterThan(0);
    });
  });

  describe('when rendered with custom fields in `props`', () => {
    it('renders `AutoField` for each field', () => {
      const wrapper = mount<TestForm<any>>(
        <TestForm<any>
          schema={schema}
          autoField={() => <i className="autoOverride" />}
        />,
      );

      expect(wrapper.find('.autoOverride').length).toBeGreaterThan(0);
    });

    it('renders `ErrorsField`', () => {
      const wrapper = mount<TestForm<any>>(
        <TestForm<any>
          schema={schema}
          errorsField={() => <i className="errorsOverride" />}
        />,
      );

      expect(wrapper.find('.errorsOverride').length).toBeGreaterThan(0);
    });

    it('renders `SubmitField`', () => {
      const wrapper = mount<TestForm<any>>(
        <TestForm<any>
          schema={schema}
          submitField={() => <i className="submitOverride" />}
        />,
      );

      expect(wrapper.find('.submitOverride').length).toBeGreaterThan(0);
    });

    it('works with elements', () => {
      class Code extends Component<{ name: string }> {
        render = () => <code />;
      }

      const wrapper = mount<TestForm<any>>(
        <TestForm schema={schema} autoField={Code} />,
      );

      expect(wrapper.find('code').length).toBeGreaterThan(0);
    });

    it('works with functions', () => {
      const wrapper = mount<TestForm<any>>(
        <TestForm schema={schema} autoField={() => <code />} />,
      );

      expect(wrapper.find('code').length).toBeGreaterThan(0);
    });
  });

  describe('when rendered with children', () => {
    const wrapper = mount<QuickForm>(
      <QuickForm schema={schema}>
        <div />
      </QuickForm>,
    );

    it('renders children', () => {
      expect(wrapper.find('div')).toHaveLength(1);
    });
  });
});
