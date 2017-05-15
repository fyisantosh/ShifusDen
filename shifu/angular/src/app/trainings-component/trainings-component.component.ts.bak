import { Component, OnInit } from '@angular/core';
import {ITraining} from '../trainings-component/training';
import { TrainingService } from '../trainings-component/training.service';

@Component({
  selector: 'app-trainings-component',
  templateUrl: './trainings-component.component.html',
  styleUrls: ['./trainings-component.component.css']
})
export class TrainingsComponent implements OnInit {

    pageTitle: string = 'Master Shifu\'s Den';
    trainingAttributes:string[]=['Training','Mode','Status','Duration','Popularity'];
    imageWidth: number = 50;
    imageMargin: number = 2; 
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    trainings: ITraining[];

    constructor(private _trainingService:TrainingService) {

    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {

      this._trainingService.getTrainings().subscribe(trainings =>this.trainings=trainings,
                                                     error => this.errorMessage =<any>error );       
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Training List: ' + message;
    }

}
