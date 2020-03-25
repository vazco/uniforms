import React, { FC, ReactNode } from 'react';
import { Context, connectField, injectName, randomIds } from 'uniforms';
import { SimpleSchemaBridge } from 'uniforms-bridge-simple-schema';

import mount from './_mount';

jest.mock('meteor/aldeed:simple-schema');
jest.mock('meteor/check');

describe('injectName', () => {
  const schema = new SimpleSchemaBridge({
    getDefinition(name) {
      return {
        fieldA: { type: Object, label: 'FieldA' },
        'fieldA.fieldB': { type: Object, label: 'FieldB' },
        'fieldA.fieldB.fieldC': { type: String, label: 'FieldC' },
      }[name];
    },

    messageForError() {},

    objectKeys(name) {
      return {
        fieldA: ['FieldB'],
        'fieldA.FieldB': ['FieldC'],
        'fieldA.FieldB.FieldC': [],
      }[name];
    },

    validator() {},
  });

  const reactContext = {
    context: {
      changed: false,
      changedMap: {},
      error: undefined,
      model: {},
      name: [],
      onChange() {},
      onSubmit() {},
      randomId: randomIds(),
      schema,
      state: {
        label: true,
        disabled: false,
        placeholder: false,
        showInlineError: true,
      },
      submitting: false,
      validating: false,
    } as Context,
  };

  type TestProps = { children?: ReactNode };
  const Test: jest.Mock & FC<TestProps> = jest.fn((props: TestProps) => (
    <span>{props.children}</span>
  ));
  const Field = connectField(Test);

  beforeEach(() => {
    Test.mockClear();
  });

  describe('when called', () => {
    it('does nothing on normal elements', () => {
      mount(
        <Field name="fieldA">{injectName('fieldB', <Test />)}</Field>,
        reactContext,
      );

      expect(Test.mock.calls[0]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldA' })]),
      );
      expect(Test.mock.calls[1]).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
    });

    it('injects name into field', () => {
      const spy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      mount(
        <Field name="fieldA">{injectName('fieldB', <Field name="" />)}</Field>,
        reactContext,
      );

      spy.mockRestore();

      expect(Test.mock.calls[0]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldA' })]),
      );
      expect(Test.mock.calls[1]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
    });

    it('injects name into fields', () => {
      const spy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      mount(
        <Field name="fieldA">
          {injectName('fieldB', [
            <Field name="" key={1} />,
            <Field name="" key={2} />,
            <Field name="" key={3} />,
          ])}
        </Field>,
        reactContext,
      );

      spy.mockRestore();

      expect(Test.mock.calls[0]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldA' })]),
      );
      expect(Test.mock.calls[1]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
      expect(Test.mock.calls[2]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
      expect(Test.mock.calls[3]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
    });

    it('injects name into nested field', () => {
      const spy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      mount(
        <Field name="fieldA">
          {injectName(
            'fieldB',
            <span>
              <Field name="" />
            </span>,
          )}
        </Field>,
        reactContext,
      );

      spy.mockRestore();

      expect(Test.mock.calls[0]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldA' })]),
      );
      expect(Test.mock.calls[1]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
    });

    it('injects name into nested fields', () => {
      const spy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      mount(
        <Field name="fieldA">
          {injectName(
            'fieldB',
            <span>
              <Field name="" />
              <Field name="" />
              <Field name="" />
            </span>,
          )}
        </Field>,
        reactContext,
      );

      spy.mockRestore();

      expect(Test.mock.calls[0]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldA' })]),
      );
      expect(Test.mock.calls[1]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
      expect(Test.mock.calls[2]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
      expect(Test.mock.calls[3]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB' }),
        ]),
      );
    });

    it('injects joined name', () => {
      const spy = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => {});

      mount(
        <Field name="fieldA">
          {injectName('fieldB', <Field name="fieldC" />)}

          {injectName(
            'fieldB',
            <span>
              <Field name="fieldC" />
            </span>,
          )}
        </Field>,
        reactContext,
      );

      spy.mockRestore();

      expect(Test.mock.calls[0]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldA' })]),
      );
      expect(Test.mock.calls[1]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB.fieldC' }),
        ]),
      );
      expect(Test.mock.calls[2]).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'fieldA.fieldB.fieldC' }),
        ]),
      );
    });

    it('injects only the first level', () => {
      mount(
        <Field name="fieldA">
          {injectName(
            'fieldB',
            <Field name="fieldC">
              <Test name="fieldD" />
            </Field>,
          )}

          {injectName(
            'fieldB',
            <span>
              <Field name="fieldC">
                <Test name="fieldD" />
              </Field>
            </span>,
          )}
        </Field>,
        reactContext,
      );

      expect(Test.mock.calls[2]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldD' })]),
      );
      expect(Test.mock.calls[4]).toEqual(
        expect.arrayContaining([expect.objectContaining({ name: 'fieldD' })]),
      );
    });
  });
});
