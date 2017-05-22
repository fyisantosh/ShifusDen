import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TraineeService } from './trainee.service';
import { ITrainee } from "app/user-list/trainee";
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  trainingDetails: string[];
  tab: string;
  trainees: ITrainee[];
  errorMessage: string;
  userFilter: string;

  constructor(private router: Router, private route: ActivatedRoute, private _traineeService: TraineeService) {

    this.trainingDetails = this.router.url.split('/');

    if (this.router.url.indexOf('active') !== -1) {
      this.tab = 'a';
    }
    else if (this.router.url.indexOf('completed') !== -1) {
      this.tab = 'c';
    }
    else {
      this.tab = 'p';
    }

    this.getTrainees();
    console.log('UserListComponent constructore called successfully');
  }

  getTrainees() {
    this._traineeService.getTrainees(this.trainingDetails[2], this.tab).subscribe(trainees => this.trainees = trainees,
      error => this.errorMessage = <any>error);
  }

  ngOnInit() {
  }

  search() {

  }

  markComplete(first_name:string,last_name:string,opco:string,psno:number){
    confirm("Do you really want to mark " +first_name+" "+ last_name+" ("+opco+")"+" as course completed?");
  }

  markAborted(first_name:string,last_name:string,opco:string,psno:number){
    confirm("Do you really want to remove " +first_name+" "+ last_name+" ("+opco+")"+" from the course?");
  }
}
