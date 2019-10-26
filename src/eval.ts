import Form, { Binder, Variable, app, binder } from "./form";

// Beta reduction on a form
export const beta = (redex: Binder, arg: Form): Form => {
  return subst(redex.form, redex.binder, arg);
};

// Get the result of substituting a term for a variable inside another form
export const subst = (inside: Form, sub: Variable, to: Form): Form => {
  switch (inside.type) {
    case "var":
      return inside.name === sub.name ? to : inside;
    case "app":
      return app(subst(inside.a, sub, to), subst(inside.b, sub, to));
    case "binder":
      return binder(inside.binder.name, subst(inside.form, sub, to));
  }
};
