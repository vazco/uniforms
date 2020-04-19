import { BaseForm } from './BaseForm';
import { Quick, QuickFormProps, QuickFormState } from './QuickForm';
import {
  Validated,
  ValidatedFormProps,
  ValidatedFormState,
} from './ValidatedForm';

export type ValidatedQuickFormProps<Model> = QuickFormProps<Model> &
  ValidatedFormProps<Model>;

export type ValidatedQuickFormState<Model> = QuickFormState<Model> &
  ValidatedFormState<Model>;

export const ValidatedQuickForm = Validated(Quick(BaseForm));
export type ValidatedQuickForm = typeof ValidatedQuickForm;
