import { ComparerFunctionType } from '@t/comparer-function.type';

export function getNumberComparer<T>(getField: (o: T) => number): ComparerFunctionType<T> {
  return (a: T, b: T) => getField(a) - getField(b);
}

export function getNumberComparerDesc<T>(getField: (o: T) => number): ComparerFunctionType<T> {
  return (a: T, b: T) => getField(b) - getField(a);
}
