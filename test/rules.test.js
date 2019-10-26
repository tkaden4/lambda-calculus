import * as term from "../build/term";
import * as rules from "../build/rules";

const freeVars = f => [...term.freeVariables(f)];

describe("calculus properties", () => {
  describe("free expressions", () => {
    test("variables are free", () => {
      expect(freeVars(term.variable("x"))).toEqual([term.variable("x")]);
    });

    test("free variables in abstraction are free", () => {
      const abstraction = term.binder("x", term.variable("y"));
      expect(freeVars(abstraction)).toEqual([term.variable("y")]);
    });

    test("nested abstractions have free variables", () => {
      const a = term.binder("x", term.binder("y", term.variable("z")));
      const b = term.binder("x", term.binder("y", term.app(term.variable("z"), term.variable("w"))));

      expect(freeVars(a)).toEqual([term.variable("z")]);
      expect(freeVars(b)).toEqual([term.variable("z"), term.variable("w")]);
    });

    test("bound variables are not free", () => {
      const abstraction = term.binder("x", term.variable("x"));
      expect(freeVars(abstraction).length).toBe(0);
    });

    test("app unions free variables of sub-terms", () => {
      const a = term.binder("x", term.variable("y"));
      const b = term.binder("x", term.variable("x"));
      const app = term.app(a, b);
      const aFree = freeVars(a);
      const bFree = freeVars(b);
      const appFree = freeVars(app);
      expect(appFree).toEqual([...aFree, ...bFree]);
    });
  });

  describe("closed expressions", () => {
    test("variables aren't closed", () => {
      expect(term.isClosed(term.variable("x"))).toBe(false);
    });
  });
});

describe("reductions", () => {
  describe("beta", () => {
    test("variable reduction", () => {
      const a = term.binder("x", term.variable("x"));
      const b = term.variable("y");
      expect(rules.beta(a, b)).toEqual(term.variable("y"));
    });

    test("lambda reduction", () => {
      const a = term.binder("x", term.variable("x"));
      const b = term.binder("y", term.variable("y"));
      expect(rules.beta(a, b)).toEqual(term.binder("y", term.variable("y")));
    });
  });
});

describe("conversions", () => {
  describe("alpha", () => {
    test("basic example", () => {
      const a = term.binder("x", term.variable("y"));
      const b = term.variable("x");
      expect(rules.alphaClean(a, b)).toEqual(term.binder("x'", term.variable("y")));
    });

    test("capture example", () => {
      const a = term.binder("x", term.variable("y"));
      const b = term.binder("y", term.variable("x"));
      expect(rules.alphaClean(a, b)).toEqual(term.binder("x'", term.variable("y")));
    });
  });
});
