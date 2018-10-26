import * as U from '@/Utils'

export interface Card {
  readonly suit: Suit
  readonly rank: number
}

export type Suit = 'hearts' | 'tiles' | 'clubs' | 'spades'
export type Color = 'black' | 'red'
export const suits: Suit[] = ['hearts', 'tiles', 'clubs', 'spades']
export const ranks: number[] = Array.from(Array(14).keys()).slice(1)

const rankSpecial: Record<number, string> = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
}
export function rankStr(rank: number): string {
  return rankSpecial[rank] !== undefined ? rankSpecial[rank] : '' + rank
}

export function suitStr(suit: Suit): string {
  return {
    hearts: '♥︎',
    tiles: '♦︎',
    clubs: '♣︎',
    spades: '♠︎',
  }[suit]
}
export function cardStr(card: Card): string {
  return suitStr(card.suit) + rankStr(card.rank)
}

export function color(suit: Suit): Color {
  return ['hearts', 'tiles'].includes(suit) ? 'red' : 'black'
}

export function standardDeck(): Card[] {
  return U.product(
    suits,
    ranks,
  ).map(({ a, b }) => ({ suit: a as Suit, rank: b }))
}
