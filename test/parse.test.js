import { parse } from "../build/parse";
import * as term from "../build/term";

describe("parsing works", () => {
  test("(lambda x x)", () => {
    expect(parse("(lambda x x)")).toEqual(term.binder("x", term.variable("x")));
  });

  describe("application", () => {
    test("(id id)", () => {
      const a = term.binder("x", term.variable("x"));
      const b = term.binder("y", term.variable("y"));
      const app = term.app(a, b);
      expect(parse("((lambda x x)(lambda y y))")).toEqual(app);
      expect(parse("((lambda x x) (lambda y y))")).toEqual(app);
      expect(parse("((lambda x x)        (lambda y y))")).toEqual(app);
    });
  });
});
