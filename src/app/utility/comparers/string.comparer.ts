import { ComparerFunctionType } from '@t/comparer-function.type';

export function getStringComparer<T>(getField: (o: T) => string): ComparerFunctionType<T> {
  return (a: T, b: T) => getField(a).localeCompare(getField(b));
}

export function getStringComparerDesc<T>(getField: (o: T) => string): ComparerFunctionType<T> {
  return (a: T, b: T) => getField(b).localeCompare(getField(a));
}
