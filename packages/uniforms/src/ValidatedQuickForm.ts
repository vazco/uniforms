import { BaseForm } from './BaseForm';
import { Quick, QuickFormProps, QuickFormState } from './QuickForm';
import {
  Validated,
  ValidatedFormProps,
  ValidatedFormState,
} from './ValidatedForm';
import { UnknownObject } from './types';

export type ValidatedQuickFormProps<Model extends UnknownObject> =
  QuickFormProps<Model> & ValidatedFormProps<Model>;

export type ValidatedQuickFormState<Model extends UnknownObject> =
  QuickFormState<Model> & ValidatedFormState<Model>;

export const ValidatedQuickForm = Validated(Quick(BaseForm));
export type ValidatedQuickForm = typeof ValidatedQuickForm;
