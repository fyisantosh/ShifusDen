import { Component, OnInit, OnChanges, Input,AfterViewInit,AfterViewChecked,AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITraining } from '../trainings-component/training';
import { TrainingService } from '../trainings-component/training.service';

@Component({
  selector: 'app-training-view-edit',
  templateUrl: './training-view-edit.component.html',
  styleUrls: ['./training-view-edit.component.css']
})
export class TrainingViewEditComponent implements OnInit {
  pageTitle: string = 'Training Detail';
  training: ITraining;
  active: string='active';
  completed: string;
  abandoned: string;
  errorMessage: string;
  isTabCalled:boolean=false;

  constructor(private _trainingService: TrainingService, private route: ActivatedRoute, private _router: Router) {
    console.log('constructor called successfully!!!');

  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    let trainingId = this.route.snapshot.params['id'];
    console.log('Before calling gettraining called successfully!!!' + trainingId);
    this._trainingService.getTraining(trainingId).subscribe(training => this.training = training[0],
      error => this.errorMessage = <any>error);
    console.log('After calling gettraining called successfully!!!' + this.training);
    setTimeout(this.onTabClick('active'), 20000);
    
  }

  onBack() {
    this._router.navigate(['/welcome']);
  }


  onTabClick(tabName: string) {
    //alert(tabName);
    let trainingId = this.route.snapshot.params['id'];
    //alert(trainingId);
    if (tabName.includes('active')) {
      this.active = 'active';
      this.completed = "";
      this.abandoned = "";
      this._router.navigate(['/showtraining/'+trainingId+'/active']);
    }
    else if (tabName.includes('completed')) {
      this._router.navigate(['/showtraining/'+trainingId+'/completed']);
      this.active = "";
      this.completed = 'active';
      this.abandoned = "";
    }
    else {
      this._router.navigate(['/showtraining/'+trainingId+'/abandoned']);
      this.active = "";
      this.completed = "";
      this.abandoned = 'active';
    }
  }

}
