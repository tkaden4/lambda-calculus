import arc = require("arcsecond");
import Term, { Binder, Variable, App } from "./term";

export const name = arc.letters.map((x: string) => ({ type: "var", name: x } as Variable));

export const binder = arc.recursiveParser(() =>
  arc
    .sequenceOf([arc.sequenceOf([name, arc.char(".")]).map(([x, ,]) => x), arc.optionalWhitespace, atomicTerm])
    .map(([binder, , f]) => ({ type: "binder", binder, body: f } as Binder))
);

export const parenTerm = arc.recursiveParser(() =>
  arc.sequenceOf([arc.char("("), term, arc.char(")")]).map(([, f, ,]) => f as Term)
);

export const atomicTerm = arc.recursiveParser(() => arc.choice([name, parenTerm]));

export const app = arc
  .sequenceOf([atomicTerm, arc.whitespace, atomicTerm])
  .map(([a, , f]) => ({ type: "app", redex: a, argument: f } as App));

export const term = arc.choice([binder, app]);

export const parser: any = arc
  .sequenceOf([arc.optionalWhitespace, atomicTerm, arc.optionalWhitespace, arc.endOfInput])
  .map(([, f, ,]) => f);

export const parse = (data: string, p = parser): Term => {
  const result = p.run(data);
  if (result.isError) {
    throw new Error(JSON.stringify(result));
  } else {
    return result.result;
  }
};

export default parse;
