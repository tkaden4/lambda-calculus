import repl from "repl";
import parse from "./parse";
import { prettifyTerm, reduceTerm } from "./rules";

export const startREPL = () => {
  repl.start({
    prompt: "λ ",
    writer: (x) => x,
    eval: (cmd, ctx, file, cb) => {
      try {
        const parsed = parse(cmd);
        cb(null, prettifyTerm(reduceTerm(parsed)));
      } catch (err) {
        cb(err.message, null);
      }
    },
  });
};
