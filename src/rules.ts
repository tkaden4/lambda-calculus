import Term, { Binder, Variable, app, binder, boundVariables, freeVariables, variable } from "./term";

const toStringSet = (vars: Set<Variable>): Set<string> => {
  return new Set([...vars].map((x) => x.name));
};

// Alpha cleaning, ensuring that a beta reduction will not change the meaning
// of the terms pre and post-reduction.
export const alphaClean = <T extends Term, V extends Term>(a: T, b: V): T => {
  // Make sure that none of the free variables in B are bound in A,
  // as this could result in a change in meaning after substitution
  const boundInA = toStringSet(boundVariables(a));
  const freeInB = toStringSet(freeVariables(b));

  // Variables shared between the bound variables of A and the
  // free variables of B
  const shared = [...freeInB].filter((x) => boundInA.has(x));

  const rename = (term: Term, old: Variable, sub: Variable): Term => {
    switch (term.type) {
      case "binder":
        return binder(term.binder.name === old.name ? sub.name : term.binder.name, rename(term.body, old, sub));
      case "var":
        return variable(term.name === old.name ? sub.name : term.name);
      case "app":
        return app(rename(term.redex, old, sub), rename(term.argument, old, sub));
    }
  };

  // Rename the variables in A that are shared with the variables
  // free in B to names unique between the two expressions
  return shared.reduce((term: Term, name: string) => {
    // TODO the name is wrong, needs to be unique always
    return rename(term, variable(name), variable(`${name}'`));
  }, a) as T;
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

export const reduceTerm = (term: Term): Term => {
  switch (term.type) {
    case "app":
      const lhs = reduceTerm(term.redex);
      if (lhs.type === "binder") {
        return reduceTerm(beta(alphaClean(lhs, term.argument), term.argument));
      } else {
        throw new Error("Cannot beta-reduce a non-redex left hand term");
      }
    default:
      return term;
  }
};

export const prettifyTerm = (term: Term): string => {
  switch (term.type) {
    case "var":
      return term.name;
    case "app":
      return `(${prettifyTerm(term.redex)} ${prettifyTerm(term.argument)})`;
    case "binder":
      return `(lambda ${prettifyTerm(term.binder)} ${prettifyTerm(term.body)})`;
  }
};
