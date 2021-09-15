import { Component, Input, OnInit, Output, SimpleChange, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Output() timeEnd: EventEmitter<number> = new EventEmitter<number>();
  timeLeft: number = 60;
  interval;
  @Input() disabledCard: boolean;
  @Output() endGame: EventEmitter<void> = new EventEmitter<void>();
  showCount: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange) {
    if (!this.interval) {
      this.timeEnd.emit();
    }

    let gameChange = changes['disabledCard']

    if (gameChange.currentValue === false) {
      this.startCountDown()
    } else {
      this.showCount = false;
      clearInterval(this.interval)
    }
  }

  ngOnDestroy() {
    if (this.timeLeft) {
      clearInterval(this.timeLeft)
    }
  }

  startCountDown() {
    this.timeLeft = 60;
    this.showCount = true;
    this.interval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        this.endGame.emit()
        this.showCount = false;
        clearInterval(this.interval)
        return true
      }
    },1000)
  }

}
