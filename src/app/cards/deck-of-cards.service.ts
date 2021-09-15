import { Card } from "../shared/card.model";
import { Decks } from "../shared/deck.model";
import { Suit } from "../shared/suit.model";

export class DeckOfCardsService {
  public cards: Card[] = [];
  public deck1: Card[] = [];
  public deck2: Card[] = [];

  constructor() {
    this.startCardGame()
  }

  startCardGame() {
    const extras = ['J', 'Q', 'K'];
    const suits = this.getSuits();

    for (let i = 1; i < 11; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === 1) {
          this.generateCard('A' + ' of ' + suits[j], 'card' + suits[j] + 'A' + '.png', suits[j])
        } else {
          this.generateCard(i + ' of ' + suits[j], 'card' + suits[j] + i + '.png', suits[j])
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        this.generateCard(extras[i] + ' of ' + suits[j], 'card' + suits[j] + extras[i] + '.png', suits[j])
      }
    }
    this.generateCard('Joker', 'cardJoker.png');
    this.generateCard('Joker', 'cardJoker.png');
  }

  generateCard(name: string, imgName: string, suit?: Suit,) {
    this.cards.push({
      name: name,
      suit: suit,
      imgFront: imgName,
      imgBack:  'cardBack_Blue2.png'
    })
  }

  getSuits(): Suit[] {
    return Object.keys(Suit).map(key => Suit[key])
  }

  getDeck1() {
    return this.deck1.slice()
  }

  getDeck2() {
    return this.deck2.slice()
  }

  getCardsForMemoryGame(): Card[][] {
    this.deck1.push(...this.cards.slice())
    this.deck2.push(...this.cards.slice())
    return [this.getDeck1().slice(), this.getDeck2().slice()]
  }
}
