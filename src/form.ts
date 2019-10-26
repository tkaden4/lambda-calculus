export type Form = Binder | App | Variable;

export interface Binder {
  type: "binder";
  binder: Variable;
  form: Form;
}

export interface App {
  type: "app";
  a: Form;
  b: Form;
}

export interface Variable {
  type: "var";
  name: string;
}

export const app = (a: Form, b: Form): App => ({ type: "app", a, b });
export const variable = (name: string): Variable => ({ type: "var", name });
export const binder = (binder: string, form: Form): Binder => ({ type: "binder", binder: variable(binder), form });

export const freeVariables = (form: Form): Set<Variable> => {
  switch (form.type) {
    case "var":
      return new Set([form]);
    case "binder":
      const vars = freeVariables(form.form);
      vars.forEach(y => {
        if (y.name === form.binder.name) {
          vars.delete(y);
        }
      });
      return vars;
    case "app":
      return new Set([...freeVariables(form.a), ...freeVariables(form.b)]);
  }
};

export const isClosed = (form: Form): boolean => freeVariables(form).size === 0;

export default Form;
