import arc = require("arcsecond");
import Term, { Binder, Variable, App } from "./term";

export const name = arc.letters.map((x: string) => ({ type: "var", name: x } as Variable));

export const parenTerm = arc.recursiveParser(() =>
  arc.sequenceOf([arc.char("("), arc.choice([binder, app]), arc.char(")")]).map(([, f, ,]) => f as Term)
);

export const atomicTerm = arc.recursiveParser(() => arc.choice([parenTerm, name]));

export const app = arc
  .sequenceOf([atomicTerm, arc.optionalWhitespace, atomicTerm])
  .map(([a, , f]) => ({ type: "app", redex: a, argument: f } as App));

export const binder = arc.recursiveParser(() =>
  arc
    .sequenceOf([
      arc.sequenceOf([arc.str("lambda"), arc.whitespace, name]).map(([, , x]) => x),
      arc.whitespace,
      atomicTerm
    ])
    .map(([binder, , f]) => ({ type: "binder", binder, body: f } as Binder))
);

export const parser: any = arc
  .sequenceOf([arc.optionalWhitespace, parenTerm, arc.optionalWhitespace, arc.endOfInput])
  .map(([, f, ,]) => f);

export const parse = (data: string, p = parser): Term => {
  const result = p.run(data);
  if (result.isError) {
    throw new Error(result.error);
  } else {
    return result.result;
  }
};

export default parse;
