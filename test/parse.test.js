import { parse } from "../build/parse";
import * as term from "../build/term";

describe("parsing works", () => {
  test("(x.x)", () => {
    expect(parse("(x.x)")).toEqual(term.binder("x", term.variable("x")));
  });
});
