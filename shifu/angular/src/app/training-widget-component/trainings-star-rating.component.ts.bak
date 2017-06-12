import { Component, OnChanges, Input,OnInit,
         Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trainings-star-rating',
  template: `
    <div class="star-ratings-sprite" (click)='onClick()' [title]="popularity">
      <span [style.width]="starWidth + '%'" class="star-ratings-sprite-rating">
      </span>
    </div>
  `,
  styleUrls: ['./trainings-star-rating.component.css']
})
export class TrainingsStarRatingComponent implements OnInit {

    @Input() popularity: number;
    starWidth: number;
    @Output() ratingClicked: EventEmitter<string> =
        new EventEmitter<string>();

    ngOnChanges(): void {
        this.starWidth = this.popularity *100 / 5;
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.popularity} was clicked!`);
    }

    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      
    }
}
