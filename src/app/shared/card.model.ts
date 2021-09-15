import { Suit } from "./suit.model";

export interface Card {
  name: string,
  // value: number, if we want more games
  suit: Suit,
  imgFront: string,
  imgBack: string
}
