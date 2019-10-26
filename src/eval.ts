import Term, { Binder, Variable, app, binder, boundVariables, freeVariables, variable } from "./term";

const toStringSet = (vars: Set<Variable>): Set<string> => {
  return new Set([...vars].map(x => x.name));
};

// Alpha conversion, ensuring that a beta reduction will not change the meaning
// of the terms pre and post-reduction.
export const alpha = (a: Term, b: Term): Term => {
  // Make sure that none of the free variables in B are bound in A,
  // as this could result in a change in meaning after substitution
  const boundInA = toStringSet(boundVariables(a));
  const freeInB = toStringSet(freeVariables(b));

  // Variables shared between the bound variables of A and the
  // free variables of B
  const shared = [...freeInB].filter(x => boundInA.has(x));

  const rename = (term: Term, old: Variable, sub: Variable) => {
    switch (term.type) {
      case "binder":
        return binder(term.binder.name === old.name ? sub.name : term.binder.name, subst(term.body, old, sub));
      default:
        return subst(term, old, sub);
    }
  };

  // Rename the variables in A that are shared with the variables
  // free in B to names unique between the two expressions
  return shared.reduce((term: Term, name: string) => {
    return rename(term, variable(name), variable(`${name}'`));
  }, a);
};

// Beta reduction on a redex term (does not handle alpha conversion).
// (x.M)N <-> M[x <- N]
export const beta = (redex: Binder, arg: Term): Term => {
  return subst(redex.body, redex.binder, arg);
};

// Get the result of substituting a term for a variable inside another form.
// N[x <- M]
export const subst = (term: Term, sub: Variable, to: Term): Term => {
  switch (term.type) {
    case "var":
      return term.name === sub.name ? to : term;
    case "app":
      return app(subst(term.redex, sub, to), subst(term.argument, sub, to));
    case "binder":
      return binder(term.binder.name, subst(term.body, sub, to));
  }
};
