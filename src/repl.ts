import repl from "repl";
import parse from "./parse";
import evalTerm, { alpha, subst, beta } from "./eval";
import Term from "./term";

export const startREPL = () => {
  repl.start({
    prompt: "λ ",
    eval: (cmd, context, filename, cb) => {
      try {
        const parsed = parse(cmd);
        cb(null, evalTerm(parsed));
      } catch (err) {
        cb(err.message, null);
      }
    }
  });
};
