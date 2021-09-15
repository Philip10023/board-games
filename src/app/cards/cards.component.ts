import { Component, OnInit } from '@angular/core';
import { DeckOfCardsService } from './deck-of-cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(public deckOfCards: DeckOfCardsService) { }

  ngOnInit(): void {
  }

}
