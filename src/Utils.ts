export function product<A, B>(as: A[], bs: B[]): { a: A; b: B }[] {
  return as.flatMap(a => bs.map(b => ({ a, b })));
}

export function enumList(e: any): string[] {
  return Object.keys(e).filter(v => !isNaN(parseInt(v)));
}
