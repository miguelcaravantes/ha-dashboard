/* eslint-disable @typescript-eslint/no-explicit-any */
type Func = (...args: any[]) => any;

const reducer =
  (f: Func, g: Func) =>
  (...args: any[]) =>
    f(g(...args));

export const compose = (...fns: Func[]): Func => fns.reduce(reducer);
export const pipe = (...fns: Func[]): Func => fns.reduceRight(reducer);
/* eslint-enable @typescript-eslint/no-explicit-any */
