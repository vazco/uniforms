import BaseForm from '/client/components/uniforms/base/BaseForm';
import QuickForm from '/client/components/uniforms/base/QuickForm';
import ValidatedForm from '/client/components/uniforms/base/ValidatedForm';

export default ValidatedForm.Validated(QuickForm.Quick(BaseForm));
