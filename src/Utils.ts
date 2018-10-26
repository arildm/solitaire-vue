export function product<A, B>(as: A[], bs: B[]): { a: A; b: B }[] {
  return as.flatMap((a) => bs.map((b) => ({ a, b })))
}

export function enumList(e: any): string[] {
  return Object.keys(e).filter((v) => !isNaN(parseInt(v)))
}

export type Pl = 'zero' | 'one' | 'many'

export function shuffle<A>(xs: A[]): A[] {
  const ys = [...xs]
  ys.sort(() => Math.random() - .5)
  return ys
}

export function range(from: number, to?: number): number[] {
  if (to === undefined) {
    to = from
    from = 0
  }
  return Array.from(Array(to - from + 1).keys()).map((i) => i + from)
}

export function objFromKeys<A>(keys: string[], init: (key: string) => A): Record<string, A> {
  const obj: Record<string, A> = {}
  keys.forEach((key) => obj[key] = init(key))
  return obj
}

export function begins(full: string, search: string): boolean {
  return full.indexOf(search) === 0
}

export function dget<A>(as: A[], i: number, def: A): A {
  return as[i] !== undefined ? as[i] : def
}
