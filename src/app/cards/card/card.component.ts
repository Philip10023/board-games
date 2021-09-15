import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Card } from 'src/app/shared/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: []
})
export class CardComponent implements OnInit {
  @Input() public card: Card
  @Input() isShowFront: boolean = false;
  @Input() isShowBack: boolean = true;
  // @Input() isDisabled: boolean = false;
  @Input() disabledCard: boolean = false;
  @Input() notifier: Subject<any>;
  @Input() disabledCards: boolean = false;
  @Input() gameStatus: boolean = false;
  @Output() notifyParentAboutCard: EventEmitter<Card[]> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    if (this.notifier != null) {
      this.notifier.subscribe((event) => {
        // This will be logged every time the subject.next is called.
        // console.log("HelloComponent heard", event);
        // this.disabledCards = !this.disabledCards;
        // this.disabledCard = !this.disabledCard;
      })
    }
  }

  ngOnChanges(changes: SimpleChange) {
  }
  toggleDisplay = (event: MouseEvent, card: Card) => {
    let buildCard: Card[] = [card];
    this.notifyParentAboutCard.emit(buildCard);
    this.disabledCard = true;
    this.isShowFront = !this.isShowFront;
    this.isShowBack = !this.isShowBack;
    if (this.gameStatus === false) {

    }
  }

  reset() {
    this.isShowFront = false;
    this.isShowBack = true;
  }
}
