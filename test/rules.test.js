import * as form from "../build/form";
import * as evaluate from "../build/eval";

const freeVars = f => [...form.freeVariables(f)];

describe("calculus properties", () => {
  describe("free expressions", () => {
    test("variables are free", () => {
      expect(freeVars(form.variable("x"))).toEqual([form.variable("x")]);
    });

    test("free variables in abstraction are free", () => {
      const abstraction = form.binder("x", form.variable("y"));
      expect(freeVars(abstraction)).toEqual([form.variable("y")]);
    });

    test("nested abstractions have free variables", () => {
      const a = form.binder("x", form.binder("y", form.variable("z")));
      const b = form.binder("x", form.binder("y", form.app(form.variable("z"), form.variable("w"))));

      expect(freeVars(a)).toEqual([form.variable("z")]);
      expect(freeVars(b)).toEqual([form.variable("z"), form.variable("w")]);
    });

    test("bound variables are not free", () => {
      const abstraction = form.binder("x", form.variable("x"));
      expect(freeVars(abstraction).length).toBe(0);
    });

    test("app unions free variables of sub-terms", () => {
      const a = form.binder("x", form.variable("y"));
      const b = form.binder("x", form.variable("x"));
      const app = form.app(a, b);
      const aFree = freeVars(a);
      const bFree = freeVars(b);
      const appFree = freeVars(app);
      expect(appFree).toEqual([...aFree, ...bFree]);
    });
  });

  describe("closed expressions", () => {
    test("variables aren't closed", () => {
      expect(form.isClosed(form.variable("x"))).toBe(false);
    });
  });
});

describe("reductions", () => {
  describe("beta", () => {
    test("variable reduction", () => {
      const a = form.binder("x", form.variable("x"));
      const b = form.variable("y");
      expect(evaluate.beta(a, b)).toEqual(form.variable("y"));
    });

    test("lambda reduction", () => {
      const a = form.binder("x", form.variable("x"));
      const b = form.binder("y", form.variable("y"));
      expect(evaluate.beta(a, b)).toEqual(form.binder("y", form.variable("y")));
    });
  });
});
