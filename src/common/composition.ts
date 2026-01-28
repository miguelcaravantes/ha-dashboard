type Func = (...args: any[]) => any;

const reducer =
  (f: Func, g: Func) =>
  (...args: any[]) =>
    f(g(...args));
export const compose = (...fns: Func[]) => fns.reduce(reducer);
export const pipe = (...fns: Func[]) => fns.reduceRight(reducer);
