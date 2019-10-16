import * as uniforms from 'uniforms';

it('exports everything', () => {
  expect(uniforms).toEqual({
    AutoForm: expect.any(Function),
    BaseField: expect.any(Function),
    BaseForm: expect.any(Function),
    Bridge: expect.any(Function),
    QuickForm: expect.any(Function),
    ValidatedForm: expect.any(Function),
    ValidatedQuickForm: expect.any(Function),
    changedKeys: expect.any(Function),
    connectField: expect.any(Function),
    context: expect.any(Object),
    createSchemaBridge: expect.any(Function),
    filterDOMProps: expect.any(Function),
    injectName: expect.any(Function),
    joinName: expect.any(Function),
    nothing: expect.any(Object),
    randomIds: expect.any(Function)
  });
});
