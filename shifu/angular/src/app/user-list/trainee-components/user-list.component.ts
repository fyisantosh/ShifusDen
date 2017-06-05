import { Router, ActivatedRoute } from '@angular/router';
import { TraineeService } from '../trainee.service';
import { ITrainee } from "app/user-list/trainee";
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NgForm } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class UserListComponent implements OnInit {

  trainingDetails: string[];
  tab: string;
  trainees: ITrainee[];
  errorMessage: string;
  userFilter: string;
  showDialog: boolean = false;
  searchResult: ITrainee[];
  selectDateOpen: boolean = false;

  //User assignment pop-up starts
  @Input() searchUserClosable = true;
  @Input() selectDateClosable = true;
  @Input() searchUserVisible: boolean = false;
  @Input() selectDateVisible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  searchUserMinHeight: string = '300';
  searchUserMaxWidth: string = '600';
  assignDateMinHeight: string = '200';
  assignDateMaxWidth: string = '600';

  closeSearchUserDialog() {
    this.searchUserVisible = false;
    this.searchResult = null;
  }

  openSearchUserDialog() {
    this.searchUserVisible = true;
  }

  closeSelectDateDialog() {
    this.selectDateVisible = false;
    this.selectDateOpen = false;
  }
  //User assignment pop-up ends

  @ViewChild('frm') public userFrm: NgForm;

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

    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      { date: this.tomorrow, status: 'full' },
      { date: this.afterTomorrow, status: 'partially' }
    ];
  }

  getTrainees() {
    this._traineeService.getTrainees(this.trainingDetails[2], this.tab).subscribe(trainees => this.trainees = trainees,
      error => this.errorMessage = <any>error);
  }


  ngOnInit() {
  }

  searchUsers(fname: string, lname: string, psno: string) {
    this._traineeService.searchUser(fname, lname, psno).subscribe(trainees => this.searchResult = trainees,
      error => this.errorMessage = <any>error);
  }

  markComplete(first_name: string, last_name: string, opco: string, psno: number) {
    confirm("Do you really want to mark " + first_name + " " + last_name + " (" + opco + ")" + " as course completed?");
  }

  markAborted(first_name: string, last_name: string, opco: string, psno: number) {
    confirm("Do you really want to remove " + first_name + " " + last_name + " (" + opco + ")" + " from the course?");
  }

  traineeSearch(form: NgForm) {
    this.searchUsers(form.value.fname, form.value.lname, form.value.psno);
  }


  //datepicker starts
  public onSelectionDone(a) {
    this.close();
  }

  public close(): void {
    this.opened = false;
  }


  @ViewChild("datepickerE") datepickerE: ElementRef;
  public isShowDatepicker: boolean = false;

  onClick(event) {
    if (!this.datepickerE.nativeElement.contains(event.target)) {
      this.isShowDatepicker = false;
    }
  }

  //
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: { date: Date, mode: string }[];
  public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened: boolean = false;

  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  addMonths(months: number) {
    //alert(months);
    this.dt.setMonth(this.dt.getMonth() + months);
  }

  public today(): void {
    this.dt = new Date();
  }

  public d20090824(): void {
    this.dt = moment('2009-08-24', 'YYYY-MM-DD')
      .toDate();
  }

  public disableTomorrow(): void {
    this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
  }

  // todo: implement custom class cases
  public getDayClass(date: any, mode: string): string {
    if (mode === 'day') {
      let dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (let event of this.events) {
        let currentDay = new Date(event.date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return event.status;
        }
      }
    }

    return '';
  }

  public disabled(date: Date, mode: string): boolean {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  }

  public open(): void {
    this.selectDateOpen = true;
    this.opened = !this.opened;
  }

  public clear(): void {
    this.dt = void 0;
    this.dateDisabled = undefined;
  }

  public toggleMin(): void {
    this.dt = new Date(this.minDate.valueOf());
  }

  selectDate() {
    this.closeSearchUserDialog();
    this.selectDateOpen = true;
  }

}
