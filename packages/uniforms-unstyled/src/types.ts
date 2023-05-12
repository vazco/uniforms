/** Option type used in SelectField or RadioField */
export type Option<Value> = {
  disabled?: boolean;
  label?: string;
  key?: string;
  value: Value;
};
