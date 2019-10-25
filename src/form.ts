export type Form = Binder | App;

export interface Binder {
  type: "binder";
  binder: string;
  form: Form;
}

export interface App {
  type: "app";
  a: Form;
  b: Form;
}

export default Form;
