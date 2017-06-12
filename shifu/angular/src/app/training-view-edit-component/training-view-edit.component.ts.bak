import { Component, OnInit,Output,EventEmitter, OnChanges, Input, AfterViewInit, AfterViewChecked, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITraining } from '../trainings-component/training';
import { TrainingService } from '../trainings-component/training.service';

@Component({
  selector: 'app-training-view-edit',
  templateUrl: './training-view-edit.component.html',
  styleUrls: ['./training-view-edit.component.css']
})
export class TrainingViewEditComponent implements OnInit, AfterContentInit {
  pageTitle: string = 'Training Detail';
  training: ITraining;
  active: string = 'active';
  completed: string;
  abandoned: string;
  errorMessage: string;
  isTabCalled: boolean = false;
  showDialog:boolean=false;
  
  //User assignment pop-up starts
  @Input() closable = true;
  @Input() visible: boolean=false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  minHeight:string='10';
  maxWidth:string='10';

  close() {
    this.visible = false;
  }

  open(){
    this.visible = true;
  }

  constructor(private _trainingService: TrainingService, private route: ActivatedRoute, private _router: Router) {
    console.log('TrainingViewEditComponent constructor called successfully!!!');

  }

  ngAfterContentInit() {
    alert('Navigating to Show training page');
    this.onTabClick('active');
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    let trainingId = this.route.snapshot.params['id'];
    console.log('Before calling gettraining called successfully!!!' + trainingId);
    this._trainingService.getTraining(trainingId).subscribe(training => this.onSubscribe(training),
      error => this.errorMessage = <any>error);
    console.log('After calling gettraining called successfully!!!' + this.training);
  }

  onBack() {
    this._router.navigate(['/welcome']);
  }

  onSubscribe(training: ITraining[]) {
    this.training = training[0];
  }

  onTabClick(tabName: string) {
    //alert(tabName);
    let trainingId = this.route.snapshot.params['id'];
    //alert(trainingId);
    if (tabName.includes('active')) {
      this.active = 'active';
      this.completed = "";
      this.abandoned = "";
      this._router.navigate(['/showtraining/' + trainingId + '/active']);
    }
    else if (tabName.includes('completed')) {
      this._router.navigate(['/showtraining/' + trainingId + '/completed']);
      this.active = "";
      this.completed = 'active';
      this.abandoned = "";
    }
    else {
      this._router.navigate(['/showtraining/' + trainingId + '/abandoned']);
      this.active = "";
      this.completed = "";
      this.abandoned = 'active';
    }
  }

}
