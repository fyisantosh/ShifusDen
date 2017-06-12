import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TraineeService } from './trainee.service';
import { ITrainee } from "app/user-list/trainee";
@Component({
  selector: 'user-all-list',
  templateUrl: './user-list.component.html',  
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
   traineeDetails: string[];  
  trainees: ITrainee[];
  traineeAttributes: string[] = ['PS NO','Name', 'Opco', 'Email', 'Phone No'];
  pageNumber: number = 0;
  recordPerPage: number = 10;
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;
  showDialog = false;

  constructor(private _traineeService: TraineeService) {    
    console.log('UsersListComponent constructor called successfully');
  }

  getUsersList() {
    this._traineeService.getUsersList(this.pageNumber, this.recordPerPage, this.listFilter).subscribe(trainees => this.trainees = trainees,
      error => this.errorMessage = <any>error);
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  previous() {
    if (this.pageNumber > 0) {
      this.pageNumber = this.pageNumber - 1;
      this.getUsersList();
    }
  }

  next() {
    this.pageNumber = this.pageNumber + 1;
    this.getUsersList();
  }

  search() {
    //alert('in search');
    this.pageNumber = 0;
    this.getUsersList();
  }

}
