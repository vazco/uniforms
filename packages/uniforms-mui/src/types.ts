/** Option type used in SelectField or RadioField */
export type Option<Value = unknown> = {
  disabled?: boolean;
  label: string;
  key?: string;
  value: Value;
};
