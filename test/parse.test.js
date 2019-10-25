import { parse } from "../build/parse";
import * as form from "../build/form";

describe("parsing works", () => {
  test("(x.x)", () => {
    expect(parse("(x.x)")).toEqual(form.binder("x", form.variable("x")));
  });
});
