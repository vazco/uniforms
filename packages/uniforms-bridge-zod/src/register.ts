import { ConnectedField, filterDOMProps, UnknownObject } from 'uniforms';
import { z } from 'zod';

// There's no possibility to retrieve them at runtime.
declare module 'uniforms' {
  interface FilterDOMProps {
    minCount: never;
    maxCount: never;
  }
}

filterDOMProps.register('minCount', 'maxCount');

declare module 'zod' {
  interface ZodType {
    uniforms(uniforms: UnknownObject | ConnectedField<any>): this;
  }

  interface ZodTypeDef {
    uniforms: UnknownObject | ConnectedField<any>;
  }
}

z.ZodType.prototype.uniforms = function extend(uniforms) {
  const This = (this as any).constructor;

  return new This({
    ...this._def,
    uniforms,
  });
};
