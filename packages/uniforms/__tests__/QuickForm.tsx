import React, { Component } from 'react';
import SimpleSchema from 'simpl-schema';
import { QuickForm } from 'uniforms';
import { SimpleSchema2Bridge } from 'uniforms-bridge-simple-schema-2';

import mount from './_mount';

describe('QuickForm', () => {
  // @ts-expect-error QuickForm is not a valid Component.
  class TestForm extends QuickForm<any> {
    // eslint-disable-next-line react/display-name
    getAutoField = () => () => <i className="auto" />;
    // eslint-disable-next-line react/display-name
    getErrorsField = () => () => <i className="errors" />;
    // eslint-disable-next-line react/display-name
    getSubmitField = () => () => <i className="submit" />;
  }

  const schema = new SimpleSchema2Bridge(
    new SimpleSchema({
      a: String,
      b: String,
      c: String,
    }),
  );

  describe('when rendered with custom fields', () => {
    it('renders `AutoField` for each field', () => {
      const wrapper = mount<TestForm>(<TestForm schema={schema} />);

      expect(wrapper.find('.auto').length).toBeGreaterThan(0);
    });

    it('renders `ErrorsField`', () => {
      const wrapper = mount<TestForm>(<TestForm schema={schema} />);

      expect(wrapper.find('.errors').length).toBeGreaterThan(0);
    });

    it('renders `SubmitField`', () => {
      const wrapper = mount<TestForm>(<TestForm schema={schema} />);

      expect(wrapper.find('.submit').length).toBeGreaterThan(0);
    });
  });

  describe('when rendered with custom fields in `props`', () => {
    it('renders `AutoField` for each field', () => {
      const wrapper = mount<TestForm>(
        <TestForm
          schema={schema}
          autoField={() => <i className="autoOverride" />}
        />,
      );

      expect(wrapper.find('.autoOverride').length).toBeGreaterThan(0);
    });

    it('renders `ErrorsField`', () => {
      const wrapper = mount<TestForm>(
        <TestForm
          schema={schema}
          errorsField={() => <i className="errorsOverride" />}
        />,
      );

      expect(wrapper.find('.errorsOverride').length).toBeGreaterThan(0);
    });

    it('renders `SubmitField`', () => {
      const wrapper = mount<TestForm>(
        <TestForm
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

      const wrapper = mount<TestForm>(
        <TestForm schema={schema} autoField={Code} />,
      );

      expect(wrapper.find('code').length).toBeGreaterThan(0);
    });

    it('works with functions', () => {
      const wrapper = mount<TestForm>(
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
