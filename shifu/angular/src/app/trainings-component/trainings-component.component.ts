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
    pageNumber:number=0;
    recordPerPage:number=10;
    imageWidth: number = 50;
    imageMargin: number = 2; 
    showImage: boolean = false;
    listFilter: string;
    errorMessage: string;

    trainings: ITraining[];

    constructor(private _trainingService:TrainingService) {

    }

    getTraining(){
       this._trainingService.getTrainings(this.pageNumber,this.recordPerPage,this.listFilter).subscribe(trainings =>this.trainings=trainings,
                                                     error => this.errorMessage =<any>error );       

    }
    ngOnInit(): void {
      this.getTraining();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Training List: ' + message;
    }

    previous(){
      if(this.pageNumber>0){
        this.pageNumber=this.pageNumber-1;  
        this.getTraining();
      }
    }

    next(){
        this.pageNumber=this.pageNumber+1; 
        this.getTraining(); 
    }

    search(){
      this.getTraining(); 
    }
}
