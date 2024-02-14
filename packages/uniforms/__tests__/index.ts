import * as uniforms from 'uniforms';
import * as suites from 'uniforms/__suites__';

it('exports everything', () => {
  expect(uniforms).toMatchObject({
    AutoForm: expect.any(Function),
    BaseForm: expect.any(Function),
    Bridge: expect.any(Function),
    QuickForm: expect.any(Function),
    ValidatedForm: expect.any(Function),
    ValidatedQuickForm: expect.any(Function),
    changedKeys: expect.any(Function),
    connectField: expect.any(Function),
    context: expect.any(Object),
    filterDOMProps: expect.any(Function),
    joinName: expect.any(Function),
    randomIds: expect.any(Function),
    useField: expect.any(Function),
    useForm: expect.any(Function),
  });
});

describe('@RTL', () => {
  suites.testConnectField();
});
