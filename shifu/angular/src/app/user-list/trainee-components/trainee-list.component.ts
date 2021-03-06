import { Router, ActivatedRoute } from '@angular/router';
import { TraineeService } from '../trainee.service';
import { ITrainee } from "app/user-list/trainee";
import { Component, OnInit, Input, Output, OnChanges, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ITrainingTrainee } from '../trainee-components/trainingTrainee';
import { NgForm } from "@angular/forms";
import * as moment from 'moment';

@Component({
  selector: 'app-user-list',
  templateUrl: './trainee-list.component.html',
  styleUrls: ['./trainee-list.component.css'],
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
export class TraineeListComponent implements OnInit {

  trainingDetails: string[];
  tab: string;
  trainees: ITrainee[];
  errorMessage: string;
  userFilter: string;
  showDialog: boolean = false;
  searchResult: ITrainee[];
  selectDateOpen: boolean = false;
  selectedItems: any = [];
  selectedTrainee: any;

  @Input() trainingStatusUpdateVisible: boolean = false;
  trainingStatusUpdateOpen: boolean = false;
  trainingStatusUpdateMinHeight: string = '200';
  trainingStatusUpdateMaxWidth: string = '600';
  action: string;
  public CourseStatusUpdateDt: Date = new Date();

  public getCourseStatusUpdateDate(): number {
    return this.CourseStatusUpdateDt && this.CourseStatusUpdateDt.getTime() || new Date().getTime();
  }

  addMonthsCourseStatusUpdate(months: number) {
    this.CourseStatusUpdateDt.setMonth(this.CourseStatusUpdateDt.getMonth() + months);
  }

  public CourseStatusUpdateToday(): void {
    this.CourseStatusUpdateDt = new Date();
  }

  public CourseStatusUpdated20090824(): void {
    this.CourseStatusUpdateDt = moment('2009-08-24', 'YYYY-MM-DD')
      .toDate();
  }

  public CourseStatusUpdateClear(): void {
    this.CourseStatusUpdateDt = void 0;
    this.dateDisabled = undefined;
  }

  public CourseStatusUpdateToggleMin(): void {
    this.CourseStatusUpdateDt = new Date(this.minDate.valueOf());
  }
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

  closetrainingStatusUpdateDialog() {
    this.trainingStatusUpdateVisible = false;
    this.trainingStatusUpdateOpen = false;
  }
  //User assignment pop-up ends


  closeSelectDateDialog() {
    //alert('called');
    this.selectDateVisible = false;
    this.selectDateOpen = false;
  }

  @ViewChild('frm') public userFrm: NgForm;

  constructor(private router: Router, private route: ActivatedRoute, private _traineeService: TraineeService) {

    this.trainingDetails = this.router.url.split('/');

    if (this.router.url.indexOf('active') !== -1) {
      this.tab = 'p';
    }
    else if (this.router.url.indexOf('completed') !== -1) {
      this.tab = 'c';
    }
    else {
      this.tab = 'a';
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
    this.selectedItems = [];
  }

  markComplete(first_name: string, last_name: string, opco: string, psno: number) {
    var r = confirm("Do you really want to mark " + first_name + " " + last_name + " (" + opco + ")" + " as course completed?");
    if (r == true) {
      this.selectedTrainee = psno;
      this.action = "Completion";
      this.trainingStatusUpdateOpen = true;
    }
  }

  markAborted(first_name: string, last_name: string, opco: string, psno: number) {
    var r = confirm("Do you really want to remove " + first_name + " " + last_name + " (" + opco + ")" + " from the course?");
    if (r == true) {
      this.selectedTrainee = psno;
      this.action = "Abandon";
      this.trainingStatusUpdateOpen = true;
    }
  }

  UserCourseStatusUpdate(status: string) {
    
    let traineeDetails: any;
    if (this.action == 'Completion') {
      traineeDetails = {
        trainingId: this.trainingDetails[2],
        updatedStatus: 'c',
        psnos: this.selectedTrainee,
        status_date: this.CourseStatusUpdateDt
      };
    }

    if (this.action == 'Abandon') {
      traineeDetails = {
        trainingId: this.trainingDetails[2],
        updatedStatus: 'a',
        psnos: this.selectedTrainee,
        status_date: this.CourseStatusUpdateDt
      };
      
    }

    this._traineeService.addUsertoTraining(traineeDetails).subscribe(response => this.onUserStatusUpdate(response),
        error => this.errorMessage = <any>error);

  }

  onUserStatusUpdate(response: Object) {
    console.log('Response-->' + response);
    this.closetrainingStatusUpdateDialog();
    this.getTrainees();
  }

  traineeSearch(form: NgForm) {
    this.searchUsers(form.value.fname, form.value.lname, form.value.psno);
  }

  public onSelectionDone(a) {
    this.close();
  }

  public onSelectionOnCourseStatusUpdateDone(a) {
    this.CourseStatusUpdateClose();
  }

  public close(): void {
    this.opened = false;
  }


  public CourseStatusUpdateClose(): void {
    this.UpdateStatusDateOpened = false;
  }


  @ViewChild("datepickerE") datepickerE: ElementRef;
  public isShowDatepicker: boolean = false;

  onClick(event) {
    if (!this.datepickerE.nativeElement.contains(event.target)) {
      this.isShowDatepicker = false;
    }
  }

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
  private UpdateStatusDateOpened: boolean = false;
  private selectDateUpdateStatusOpen: boolean = false;


  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  addMonths(months: number) {
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

  public statusUpdateOpen(): void {
    this.selectDateUpdateStatusOpen = true;
    this.UpdateStatusDateOpened = !this.opened;
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

  selectedValues(user, event) {

    var index = this.selectedItems.indexOf(user._id);
    if (event.target.checked) {
      if (index === -1) {
        this.selectedItems.push(user._id);
      }
    } else {
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }

  assignUser2Training() {
    let traineeDetails: any = {
      trainingId: this.trainingDetails[2],
      updatedStatus: 'p',
      psnos: this.selectedItems,
      status_date: this.dt,
      target_date: new Date()
    };

    this._traineeService.addUsertoTraining(traineeDetails).subscribe(response => this.onUserAssignment(response),
      error => this.errorMessage = <any>error);

  }

  onUserAssignment(response: Object) {
    console.log('Response-->' + response);
    this.closeSelectDateDialog();
    this.getTrainees();
  }
}
