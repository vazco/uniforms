import BaseForm from './BaseForm';
import QuickForm, { QuickFormProps, QuickFormState } from './QuickForm';
import ValidatedForm, {
  ValidatedFormProps,
  ValidatedFormState,
} from './ValidatedForm';

export type ValidatedQuickFormProps<Model> = QuickFormProps<Model> &
  ValidatedFormProps<Model>;

export type ValidatedQuickFormState<Model> = QuickFormState<Model> &
  ValidatedFormState<Model>;

export default ValidatedForm.Validated(QuickForm.Quick(BaseForm));
