import arc = require("arcsecond");
import Form from "./form";

export const name = arc.letters;

export const binder = arc.recursiveParser(() =>
  arc
    .sequenceOf([arc.sequenceOf([name, arc.char(".")]).map(([x]) => x), arc.optionalWhitespace, atomicForm])
    .map(([binder, , f]) => ({ type: "binder", binder, form: f }))
);

export const parenthesizedForm = arc.recursiveParser(() =>
  arc.sequenceOf([arc.char("("), form, arc.char(")")]).map(([, f, ,]) => f)
);

export const atomicForm = arc.recursiveParser(() => arc.choice([name, parenthesizedForm]));

export const app = arc
  .recursiveParser(() => arc.sequenceOf([atomicForm, arc.whitespace, atomicForm]))
  .map(([a, , f]) => ({ type: "app", a: a, b: f }));

export const form = arc.choice([binder, app]);

export const parser: any = arc
  .sequenceOf([arc.optionalWhitespace, atomicForm, arc.optionalWhitespace, arc.endOfInput])
  .map(([, f, ,]) => f);

export const parse = (data: string, p = parser): Form => {
  const result = p.run(data);
  if (result.isError) {
    throw new Error(JSON.stringify(result));
  } else {
    return result.result;
  }
};

export default parse;
