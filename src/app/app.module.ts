import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { CardMemoryGameComponent } from './cards/card-memory-game/card-memory-game.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { CardComponent } from './cards/card/card.component';
import { ListOfGamesComponent } from './list-of-games/list-of-games.component';
import { DeckOfCardsService } from './cards/deck-of-cards.service';
import { CountDownComponent } from './cards/card-memory-game/count-down/count-down.component';
import { TimerComponent } from './cards/card-memory-game/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    CardMemoryGameComponent,
    HomeComponent,
    HeaderComponent,
    CardsComponent,
    CardComponent,
    ListOfGamesComponent,
    CountDownComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [DeckOfCardsService, CardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
