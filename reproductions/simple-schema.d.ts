import { ComponentType } from 'react';
import { GuaranteedProps, UnknownObject } from 'uniforms';

declare module 'simpl-schema' {
  export interface SchemaDefinition {
    uniforms?: ComponentType<GuaranteedProps<unknown>> | UnknownObject | string;
  }
}
