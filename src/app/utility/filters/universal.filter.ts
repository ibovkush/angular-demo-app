export type FilterField<E> = {
  [K in keyof E]: E[K] | ReadonlyArray<E[K]>;
};

export const universalFilterFunc = <T>(entities: Array<T>, pattern: Partial<FilterField<T>>): Array<T> =>
  entities.filter(
    (entity) =>
      !Object.keys(pattern).find((key) =>
        pattern[key].length ? !pattern[key].find((val) => entity[key] === val) : entity[key] !== pattern[key]
      )
  );
