import repl from "repl";
import parse from "./parse";
import reduceTerm from "./rules";
export const startREPL = () => {
  repl.start({
    prompt: "λ ",
    eval: (cmd, ctx, file, cb) => {
      try {
        const parsed = parse(cmd);
        cb(null, reduceTerm(parsed));
      } catch (err) {
        cb(err.message, null);
      }
    }
  });
};
