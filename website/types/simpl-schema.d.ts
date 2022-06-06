import { ComponentType } from 'react';
import { GuaranteedProps } from 'uniforms';

declare module 'simpl-schema' {
  export interface SchemaDefinition {
    uniforms?:
      | Record<string, unknown>
      | ComponentType<GuaranteedProps<unknown>>
      | string;
  }
}
