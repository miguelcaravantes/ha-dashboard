const reducer = (f, g) => (...args) => f(g(...args));
export const compose = (...fns) => fns.reduce(reducer);
export const pipe = (...fns) => fns.reduceRight(reducer);
