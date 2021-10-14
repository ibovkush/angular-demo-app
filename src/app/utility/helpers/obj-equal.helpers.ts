export function objEqualWithJson<T>(a: T, b: T): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function objEqualWithEcxeptions<T>(a: T, b: T, exceptFields: ReadonlyArray<string> = []): boolean {
  return (
    Object.keys(a)
      .filter((key) => exceptFields.findIndex((ef) => ef === key) === -1)
      .findIndex((key) => a[key] !== b[key]) === -1
  );
}
