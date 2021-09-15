import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, Injectable, OnInit, Output, QueryList, SimpleChange, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { Card } from 'src/app/shared/card.model';
import { CardComponent } from '../card/card.component';
import { DeckOfCardsService } from '../deck-of-cards.service';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-card-memory-game',
  templateUrl: './card-memory-game.component.html',
  styleUrls: ['./card-memory-game.component.css']
})
export class CardMemoryGameComponent implements OnInit {
  decks: Card[][];
  cards: Card[][] = [];
  chosenCards: Card[] = [];
  currentIndex: number;
  currentShuffle: Card[][] | Card [];
  isShowBack = true;
  isShowFront = false;
  countDown: number; // in ms
  gameMode: string;
  gameStatus: boolean = false;
  pairs: Card[][] = [];
  disabledCard: boolean = true;
  disabledCards: boolean = false;
  correctPairs: Card[][] = [];
  incorrectPairs: Card[][] = [];
  subject = new Subject<string>();
  strikes = 0;
  printTime: number = undefined;
  winner: boolean = false;
  @ViewChildren(TimerComponent)
  timeEnd: QueryList<TimerComponent>;
  @ViewChildren(CardComponent)
  accessCards: QueryList<CardComponent>

  constructor(private deckOfCards: DeckOfCardsService,
              private cdRef: ChangeDetectorRef,
              private cardEvent: CardComponent) { }




  ngOnInit(): void {
    this.decks = this.deckOfCards.getCardsForMemoryGame();
    this.cardSort()
  }

  ngOnChanges(changes: SimpleChange) {
    // console.log(changes)
  }

  endGame() {
    console.log(this.printTime)
    this.disabledCard = true;
      setTimeout(() => {
        this.accessCards.forEach(c =>{
          c.reset()
        })
      }, 5)
      this.decks = [];
      this.gameStatus = false;
      this.chosenCards = [];
      this.pairs = [];
      this.cards = [];
      this.correctPairs = [];
      this.strikes = 0;
      this.currentIndex = 0;
      this.currentShuffle = [];
      this.disabledCards = false;
      console.log('disabled false')

      this.decks = this.deckOfCards.getCardsForMemoryGame();
      this.cardSort()
  }

  cardEventMethod(card: Card[]) {
    console.log(this.chosenCards)
    this.pairs.push(card)
    if (this.pairs.length === 2) {
      // this.disabledCard = !this.disabledCard;
      // this.disabledCards = !this.disabledCards;
      // this.subject.next('FROM PARENT')
      if (this.pairs[0][0].name === this.pairs[1][0].name) {
        this.correctPairs.push(...this.pairs)
        this.pairs = [];
      } else {
        let storePairs = [this.pairs[0][0], this.pairs[1][0]]
        this.disabledCards = true;
        setTimeout(() => {

          this.accessCards.forEach(c =>{
            if (c.card === storePairs[0] || c.card === storePairs[1]) {
              c.isShowFront = false;
              c.isShowBack = true;
              c.disabledCard = false
            }
          })
        }, 600)
        this.disabledCards = false;
        this.strikes++;
        this.pairs = [];
      }
    }
    setTimeout(() => {
      if (this.strikes === 5) {
        this.endGame()
      } else if (this.correctPairs.length === 12) {
        this.timeEnd.forEach(item => {
          this.printTime = item.timeLeft;
        })
        this.winner = true;
        setTimeout(()=> {
          this.endGame()
        }, 50)
      }
    }, 1000)
  }

  cardSort() {
    const deck1: Card[] = this.decks[0];
    const deck2: Card[] = this.decks[1];

    for (let i = 0; i < 54; i++) {
      this.cards.push([
        deck1[i],
        deck2[i]
      ])
    }

    this.mode('medium')
  }

  dealer(gameMode: string) {

    this.multiPurposeShuffle("pairs");

    if (gameMode === 'medium') {
      const chosenCardPairs = this.cards.slice(0,6);
      for (let card of chosenCardPairs) {
        this.chosenCards.push(card[0])
        this.chosenCards.push(card[1])
      }
      this.multiPurposeShuffle("cards")
      return this.chosenCards;
    } else {
      return this.cards;
    }
  }

  multiPurposeShuffle(pairsOrChosenCards: string) {
    if (pairsOrChosenCards === 'pairs') {
      this.currentIndex = this.cards.length;
      this.currentShuffle = this.cards;
    } else {
      this.currentIndex = this.chosenCards.length;
      this.currentShuffle = this.chosenCards;
    }
    let randomIndex = Math.floor(Math.random() * this.currentIndex);

      while (0 !== this.currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * this.currentIndex);
        this.currentIndex--;

        // And swap it with the current element.
        [this.currentShuffle[this.currentIndex], this.currentShuffle[randomIndex]] = [
          this.currentShuffle[randomIndex], this.currentShuffle[this.currentIndex]];

      }
  }

  mode(type: string) {
    if (type === 'medium') {
      this.dealer(type);
    }
  }

  startGame() {
    this.printTime = undefined;
    this.winner = false;
    // this.isShowFront = !this.isShowFront;
    // this.isShowBack = !this.isShowBack;
    this.gameStatus = true;
    setTimeout(() => {
      // this.isShowFront = !this.isShowFront;
      // this.isShowBack = !this.isShowBack;
      this.startTimer()
    }, 5000)
  }

  startTimer() {
    this.disabledCard = false;
  }

}
