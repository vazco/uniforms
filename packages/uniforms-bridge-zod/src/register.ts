import { ConnectedField, filterDOMProps, UnknownObject } from "uniforms";
import { z, ZodTypeAny } from "zod";

// There's no possibility to retrieve them at runtime.
declare module "uniforms" {
  interface FilterDOMProps {
    minCount: never;
    maxCount: never;
  }
}

filterDOMProps.register("minCount", "maxCount");

declare module "zod" {
  interface ZodType {
    uniforms(uniforms: ConnectedField<UnknownObject>): ZodTypeAny;
    _uniforms: ConnectedField<UnknownObject>;
  }
}

z.ZodType.prototype.uniforms = function extend(uniforms) {
  this._uniforms = uniforms;
  return this;
};
