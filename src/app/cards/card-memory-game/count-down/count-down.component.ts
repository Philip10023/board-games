import { Component, Input, OnInit, SimpleChange } from '@angular/core';


@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit {
  timeLeft: number = 500;
  timeLeftMS: string;
  timeLeftSec: string;
  interval;
  @Input() gameStatus: boolean = false;
  showCount: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChange) {
    let gameChange = changes['gameStatus']
    this.timeLeft = 500;

    if (gameChange.currentValue === true) {
      this.startCountDown()
    }
  }
  ngOnDestroy() {
    if (this.timeLeft) {
      clearInterval(this.timeLeft)
    }
  }

  startCountDown() {
    this.showCount = true;
    this.interval = setInterval(() => {
      this.timeLeft--;
      let timeLeftToString = this.timeLeft.toString().slice();
      if (this.timeLeft <= 99) {
        this.timeLeftSec = '0'
        this.timeLeftMS = timeLeftToString;
      } else {
        this.timeLeftSec = timeLeftToString[0];
        this.timeLeftMS = timeLeftToString[1] + timeLeftToString[2];
      }
      if (this.timeLeft === 0) {
        this.showCount = false;
        clearInterval(this.interval)
        return true
      }
    },10)
  }
}
