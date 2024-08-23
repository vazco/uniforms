import { describe, expect, test, vi } from "vitest";
import z, { ZodIssueCode } from "zod";

import { ZodBridge } from "uniforms-bridge-zod";
import { connectField } from "uniforms";

describe("ZodBridge", () => {
  describe("#getError", () => {
    test("works without error", () => {
      const schema = z.object({ a: z.string() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getError("a", null)).toBe(null);
      expect(bridge.getError("a", undefined)).toBe(null);
    });

    test("works with simple types", () => {
      const schema = z.object({ a: z.string(), b: z.number() });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({});
      const issues = error?.issues;
      expect(bridge.getError("a", error)).toBe(issues?.[0]);
      expect(bridge.getError("b", error)).toBe(issues?.[1]);
    });

    test("works with arrays", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: [["x", "y", 0], [1]] });
      const issues = error?.issues;
      expect(bridge.getError("a", error)).toBe(null);
      expect(bridge.getError("a.0", error)).toBe(null);
      expect(bridge.getError("a.0.0", error)).toBe(null);
      expect(bridge.getError("a.0.1", error)).toBe(null);
      expect(bridge.getError("a.0.2", error)).toBe(issues?.[0]);
      expect(bridge.getError("a.1.0", error)).toBe(issues?.[1]);
    });

    test("works with nested objects", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: { b: { c: 1 } } });
      const issues = error?.issues;
      expect(bridge.getError("a", error)).toBe(null);
      expect(bridge.getError("a.b", error)).toBe(null);
      expect(bridge.getError("a.b.c", error)).toBe(issues?.[0]);
    });

    test("works with refined schema", () => {
      const errorMessage = "Different values";

      const schema = z
        .object({
          a: z.string(),
          b: z.string(),
        })
        .refine(({ a, b }) => a === b, {
          message: errorMessage,
          path: ["b"],
        });

      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: "a", b: "b" });
      expect(error?.issues?.[0]?.message).toBe(errorMessage);
    });

    test("works with super refined schema", () => {
      const errorMessage = "Different values";

      const schema = z
        .object({
          a: z.string(),
          b: z.string(),
        })
        .superRefine((val, ctx) => {
          if (val.a !== val.b) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              message: errorMessage,
            });
          }
        });

      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: "a", b: "b" });
      expect(error?.issues?.[0]?.message).toBe(errorMessage);
    });
  });

  describe("#getErrorMessage", () => {
    test("works without error", () => {
      const schema = z.object({ a: z.string() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getErrorMessage("a", null)).toBe("");
      expect(bridge.getErrorMessage("a", undefined)).toBe("");
    });

    test("works with simple types", () => {
      const schema = z.object({ a: z.string(), b: z.number() });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({});
      const issues = error?.issues;
      expect(bridge.getErrorMessage("a", error)).toBe(issues?.[0].message);
      expect(bridge.getErrorMessage("b", error)).toBe(issues?.[1].message);
    });

    test("works with arrays", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: [["x", "y", 0], [1]] });
      const issues = error?.issues;
      expect(bridge.getErrorMessage("a", error)).toBe("");
      expect(bridge.getErrorMessage("a.0", error)).toBe("");
      expect(bridge.getErrorMessage("a.0.0", error)).toBe("");
      expect(bridge.getErrorMessage("a.0.1", error)).toBe("");
      expect(bridge.getErrorMessage("a.0.2", error)).toBe(issues?.[0].message);
      expect(bridge.getErrorMessage("a.1.0", error)).toBe(issues?.[1].message);
    });

    test("works with nested objects", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: { b: { c: 1 } } });
      const issues = error?.issues;
      expect(bridge.getErrorMessage("a", error)).toBe("");
      expect(bridge.getErrorMessage("a.b", error)).toBe("");
      expect(bridge.getErrorMessage("a.b.c", error)).toBe(issues?.[0].message);
    });
  });

  describe("#getErrorMessages", () => {
    test("works without error", () => {
      const schema = z.object({ a: z.string() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getErrorMessages(null)).toEqual([]);
      expect(bridge.getErrorMessages(undefined)).toEqual([]);
    });

    test("works with generic error", () => {
      const schema = z.object({ a: z.string() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getErrorMessages(new Error("Error"))).toEqual(["Error"]);
    });

    test("works with simple types", () => {
      const schema = z.object({ a: z.string(), b: z.number() });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({});
      const messages = ["A: Required", "B: Required"];
      expect(bridge.getErrorMessages(error)).toEqual(messages);
    });

    test("works with arrays", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: [["x", "y", 0], [1]] });
      const messages = [
        "A (0, 2): Expected string, received number",
        "A (1, 0): Expected string, received number",
      ];
      expect(bridge.getErrorMessages(error)).toEqual(messages);
    });

    test("works with nested objects", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      const error = bridge.getValidator()({ a: { b: { c: 1 } } });
      const messages = ["C: Expected string, received number"];
      expect(bridge.getErrorMessages(error)).toEqual(messages);
    });
  });

  describe("#getField", () => {
    test("works with root schema", () => {
      const schema = z.object({});
      const bridge = new ZodBridge({ schema });
      expect(bridge.getField("")).toBe(schema);
    });

    test("works with simple types", () => {
      const schema = z.object({ a: z.string(), b: z.number() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getField("a")).toBe(schema.shape.a);
      expect(bridge.getField("b")).toBe(schema.shape.b);
    });

    test("works with arrays", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getField("a")).toBe(schema.shape.a);
      expect(bridge.getField("a.$")).toBe(schema.shape.a.element);
      expect(bridge.getField("a.$.$")).toBe(schema.shape.a.element.element);
    });

    test("works with nested objects", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getField("a")).toBe(schema.shape.a);
      expect(bridge.getField("a.b")).toBe(schema.shape.a.shape.b);
      expect(bridge.getField("a.b.c")).toBe(schema.shape.a.shape.b.shape.c);
    });

    test("works with default", () => {
      const schema = z.object({
        a: z.object({ b: z.string() }).default({ b: "x" }),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getField("a")).toBe(schema.shape.a);
      expect(bridge.getField("a.b")).toBe(
        schema.shape.a.removeDefault().shape.b,
      );
    });

    test("works with optional", () => {
      const schema = z.object({ a: z.optional(z.object({ b: z.string() })) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getField("a")).toBe(schema.shape.a);
      expect(bridge.getField("a.b")).toBe(schema.shape.a.unwrap().shape.b);
    });
  });

  describe("#getInitialValue", () => {
    test("works with array", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual([]);
      expect(bridge.getInitialValue("a.0")).toEqual([]);
      expect(bridge.getInitialValue("a.0.0")).toEqual(undefined);
    });

    test("works with array (min length)", () => {
      const schema = z.object({
        a: z.array(z.array(z.string()).min(1)).min(2),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual([[], []]);
      expect(bridge.getInitialValue("a.0")).toEqual([]);
      expect(bridge.getInitialValue("a.0.0")).toEqual(undefined);
    });

    test("works with boolean", () => {
      const schema = z.object({ a: z.boolean() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual(undefined);
    });

    test("works with date", () => {
      const schema = z.object({ a: z.date() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual(undefined);
    });

    test("works with enum (array)", () => {
      const schema = z.object({ a: z.enum(["x", "y", "z"]) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual("x");
    });

    test("works with enum (native, numbers)", () => {
      enum Test {
        x,
        y,
        z,
      }

      const schema = z.object({ a: z.nativeEnum(Test) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual(0);
    });

    test("works with enum (native, string)", () => {
      enum Test {
        x = "x",
        y = "y",
        z = "z",
      }

      const schema = z.object({ a: z.nativeEnum(Test) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual(Test.x);
    });

    test("works with number", () => {
      const schema = z.object({ a: z.number() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual(undefined);
    });

    test("works with object", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual({ b: {} });
      expect(bridge.getInitialValue("a.b")).toEqual({});
      expect(bridge.getInitialValue("a.b.c")).toEqual(undefined);
    });

    test("works with default", () => {
      const schema = z.object({ a: z.string().default("x") });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual("x");
    });

    test("works with optional", () => {
      const schema = z.object({ a: z.optional(z.string()) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual(undefined);
    });

    test("works with ZodEffects", () => {
      const schema = z.object({}).refine((data) => data);
      const bridge = new ZodBridge({ schema });
      expect(bridge.getField("")).toBe(schema._def.schema);
    });

    test("works with string", () => {
      const schema = z.object({ a: z.string() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getInitialValue("a")).toEqual(undefined);
    });
  });

  describe("#getProps", () => {
    test("works with array", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: true });
      expect(bridge.getProps("a.0")).toEqual({ label: "0", required: true });
      expect(bridge.getProps("a.0.0")).toEqual({ label: "0", required: true });
    });

    test("works with array (maxCount)", () => {
      const schema = z.object({ a: z.array(z.array(z.string())).max(1) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        label: "A",
        required: true,
        maxCount: 1,
      });
    });

    test("works with array (minCount)", () => {
      const schema = z.object({ a: z.array(z.array(z.string())).min(1) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        label: "A",
        required: true,
        minCount: 1,
      });
    });

    test("works with boolean", () => {
      const schema = z.object({ a: z.boolean() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: true });
    });

    test("works with date", () => {
      const schema = z.object({ a: z.date() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: true });
    });

    test("works with enum (array)", () => {
      const schema = z.object({ a: z.enum(["x", "y", "z"]) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        options: ["x", "y", "z"].map((value) => ({ value })),
        label: "A",
        required: true,
      });
    });

    test("works with enum (native, number)", () => {
      enum Test {
        x,
        y,
        z,
      }

      const schema = z.object({ a: z.nativeEnum(Test) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        options: [0, 1, 2].map((value) => ({ value })),
        label: "A",
        required: true,
      });
    });

    test("works with enum (native, string)", () => {
      enum Test {
        x = "x",
        y = "y",
        z = "z",
      }

      const schema = z.object({ a: z.nativeEnum(Test) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        options: ["x", "y", "z"].map((value) => ({ value })),
        label: "A",
        required: true,
      });
    });

    test("works with number", () => {
      const schema = z.object({ a: z.number() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        label: "A",
        required: true,
        decimal: true,
      });
    });

    test("works with number (int)", () => {
      const schema = z.object({ a: z.number().int() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: true });
    });

    test("works with number (max)", () => {
      const schema = z.object({ a: z.number().max(1) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        label: "A",
        required: true,
        decimal: true,
        max: 1,
      });
    });

    test("works with number (min)", () => {
      const schema = z.object({ a: z.number().min(1) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        label: "A",
        required: true,
        decimal: true,
        min: 1,
      });
    });

    test("works with number (multipleOf)", () => {
      const schema = z.object({ a: z.number().int().multipleOf(7) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        label: "A",
        required: true,
        step: 7,
      });
    });

    test("works with object", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: true });
      expect(bridge.getProps("a.b")).toEqual({ label: "B", required: true });
      expect(bridge.getProps("a.b.c")).toEqual({ label: "C", required: true });
    });

    test("works with default", () => {
      const schema = z.object({ a: z.string().default("x") });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: false });
    });

    test("works with optional", () => {
      const schema = z.object({ a: z.optional(z.string()) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: false });
    });

    test("works with string", () => {
      const schema = z.object({ a: z.string() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({ label: "A", required: true });
    });

    test("works with uniforms props", () => {
      const schema = z.object({ a: z.string().uniforms({ type: "password" }) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        label: "A",
        required: true,
        type: "password",
      });
    });

    test("works with uniforms props (component)", () => {
      const field = vi.fn(() => null);
      const Field = connectField(field);

      const schema = z.object({ a: z.string().uniforms(Field) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getProps("a")).toEqual({
        component: Field,
        label: "A",
        required: true,
      });
    });
  });

  describe("#getSubfields", () => {
    test("works with empty objects", () => {
      const schema = z.object({});
      const bridge = new ZodBridge({ schema });
      expect(bridge.getSubfields()).toEqual([]);
    });

    test("works with non-empty objects", () => {
      const schema = z.object({ a: z.string(), b: z.number() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getSubfields()).toEqual(["a", "b"]);
    });

    test("works with simple types", () => {
      const schema = z.object({ a: z.string(), b: z.number() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getSubfields("a")).toEqual([]);
      expect(bridge.getSubfields("b")).toEqual([]);
    });

    test("works with arrays", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getSubfields("a")).toEqual(["$"]);
      expect(bridge.getSubfields("a.$")).toEqual(["$"]);
      expect(bridge.getSubfields("a.$.$")).toEqual([]);
    });

    test("works with nested objects", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getSubfields("a")).toEqual(["b"]);
      expect(bridge.getSubfields("a.b")).toEqual(["c"]);
      expect(bridge.getSubfields("a.b.c")).toEqual([]);
    });

    test("works with optional", () => {
      const schema = z.object({
        a: z.object({ b: z.string() }).default({ b: "x" }),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getSubfields("a")).toEqual(["b"]);
      expect(bridge.getSubfields("a.b")).toEqual([]);
    });

    test("works with optional", () => {
      const schema = z.object({ a: z.optional(z.object({ b: z.string() })) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getSubfields("a")).toEqual(["b"]);
      expect(bridge.getSubfields("a.b")).toEqual([]);
    });
  });

  describe("#getType", () => {
    test("works with array", () => {
      const schema = z.object({ a: z.array(z.array(z.string())) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(Array);
    });

    test("works with boolean", () => {
      const schema = z.object({ a: z.boolean() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(Boolean);
    });

    test("works with date", () => {
      const schema = z.object({ a: z.date() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(Date);
    });

    test("works with enum (array)", () => {
      const schema = z.object({ a: z.enum(["x", "y", "z"]) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(String);
    });

    test("works with enum (native, number)", () => {
      enum Test {
        x,
        y,
        z,
      }

      const schema = z.object({ a: z.nativeEnum(Test) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(Number);
    });

    test("works with enum (native, string)", () => {
      enum Test {
        x = "x",
        y = "y",
        z = "z",
      }

      const schema = z.object({ a: z.nativeEnum(Test) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(String);
    });

    test("works with number", () => {
      const schema = z.object({ a: z.number() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(Number);
    });

    test("works with object", () => {
      const schema = z.object({
        a: z.object({ b: z.object({ c: z.string() }) }),
      });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(Object);
    });

    test("works with default", () => {
      const schema = z.object({ a: z.string().default("x") });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(String);
    });

    test("works with optional", () => {
      const schema = z.object({ a: z.optional(z.string()) });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(String);
    });

    test("works with string", () => {
      const schema = z.object({ a: z.string() });
      const bridge = new ZodBridge({ schema });
      expect(bridge.getType("a")).toBe(String);
    });

    test.each([
      ["any", z.any()],
      ["bigint", z.bigint()],
      [
        "discriminatedUnion",
        z.discriminatedUnion("type", [
          z.object({ type: z.literal("a") }),
          z.object({ type: z.literal("b") }),
        ]),
      ],
      ["function", z.function()],
      ["intersection", z.intersection(z.number(), z.string())],
      ["instanceof", z.instanceof(Date)],
      ["lazy", z.lazy(() => z.string())],
      ["literal", z.literal("a")],
      ["map", z.map(z.string(), z.string())],
      ["nan", z.nan()],
      ["never", z.never()],
      ["null", z.null()],
      ["promise", z.promise(z.string())],
      ["record", z.record(z.string())],
      ["set", z.set(z.string())],
      ["tuple", z.tuple([])],
      ["undefined", z.undefined()],
      ["union", z.union([z.number(), z.string()])],
      ["unknown", z.unknown()],
    ])("throws on %s", (type, fieldSchema) => {
      const schema = z.object({ a: fieldSchema });
      const bridge = new ZodBridge({ schema });
      const error = 'Field "a" has an unknown type';
      expect(() => bridge.getType("a")).toThrowError(error);
    });
  });

  describe("#getValidator", () => {
    test("return a function", () => {
      const schema = z.object({});
      const bridge = new ZodBridge({ schema });
      const validator = bridge.getValidator();
      expect(validator).toEqual(expect.any(Function));
      expect(validator({})).toEqual(null);
    });
  });
});
