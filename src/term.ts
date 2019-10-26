export type Term = Binder | App | Variable;

export interface Binder {
  type: "binder";
  binder: Variable;
  body: Term;
}

export interface App {
  type: "app";
  redex: Term;
  argument: Term;
}

export interface Variable {
  type: "var";
  name: string;
}

export const app = (a: Term, b: Term): App => ({ type: "app", redex: a, argument: b });
export const variable = (name: string): Variable => ({ type: "var", name });
export const binder = (binder: string, term: Term): Binder => ({
  type: "binder",
  binder: variable(binder),
  body: term
});

export const freeVariables = (term: Term): Set<Variable> => {
  switch (term.type) {
    case "var":
      return new Set([term]);
    case "binder":
      const vars = freeVariables(term.body);
      vars.forEach(y => {
        if (y.name === term.binder.name) {
          vars.delete(y);
        }
      });
      return vars;
    case "app":
      return new Set([...freeVariables(term.redex), ...freeVariables(term.argument)]);
  }
};

export const boundVariables = (term: Term): Set<Variable> => {
  switch (term.type) {
    case "var":
      return new Set();
    case "app":
      return new Set([...boundVariables(term.redex), ...boundVariables(term.argument)]);
    case "binder":
      return new Set([term.binder, ...boundVariables(term.body)]);
  }
};

export const isClosed = (term: Term): boolean => freeVariables(term).size === 0;

export default Term;
