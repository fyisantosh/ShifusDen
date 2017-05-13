import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ITraining } from '../trainings-component/training';
import { TrainingService } from '../trainings-component/training.service';

@Component({
  selector: 'app-training-view-edit',
  templateUrl: './training-view-edit.component.html',
  styleUrls: ['./training-view-edit.component.css']
})
export class TrainingViewEditComponent implements OnInit {
  pageTitle: string = 'Training Detail';
  training: ITraining = {
    "_id": "",
    "tname": "",
    "mode": "",
    "status":true,
    "duration": 0,
    "desc": "",
    "popularity": 3,
    "imageUrl": "http://iimbg.ac.in/sites/all/themes/iimc/images/no-image.jpg"
  };
  
  errorMessage: string;

  constructor(private _trainingService: TrainingService, private route: ActivatedRoute, private _router: Router) {
    console.log('constructor called successfully!!!');

  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    let trainingId = this.route.snapshot.params['id'];
    console.log('before calling gettrainings called successfully!!!' + trainingId);
    this._trainingService.getTraining(trainingId).subscribe(training => this.training = training,
      error => this.errorMessage = <any>error);
    console.log('After calling gettrainings called successfully!!!' + this.training.tname);
  }

  onBack(){
    this._router.navigate(['/welcome']);
  }

}
