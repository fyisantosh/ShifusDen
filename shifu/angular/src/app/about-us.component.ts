import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-about-us',
  template: `
    <div class="panel panel-primary">
    <div class="panel-heading">
        {{pageTitle}}
    </div>
    <div class="panel-body"  >
        <div class="row" >
            <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTnFAaJoRFjj33LZ_OGHj72oClUYLmWy12LogSeAKz0v1li3x3S" 
                 class="img-responsive center-block"
                 style="max-height:300px;padding-bottom:50px"/>
        </div>
        <div class="row"  >
            <div class="text-center">Developed by:</div>
            <h3 class="text-center">Code DOJO Team</h3>

            <div class="text-center">@L&T Infotech</div>
        </div>
    </div>
    </div>
     
  <div class="container">
    <div class="row">
        <div class='col-sm-3'>
            <div class="form-group">
                <div class='input-group date'>
                    <input type='text' class="form-control" value="{{ getDate() | date:'dd-MMMM-yyyy' }}" />
                    <span class="input-group-addon" (click)="open()">
                        <span class="glyphicon glyphicon-calendar"></span>
                    </span>
                </div>
			          <div style="display:inline-block;" *ngIf="opened">
                    <datepicker [(ngModel)]="dt" [minDate]="minDate" [showWeeks]="true" [dateDisabled]="dateDisabled" (selectionDone)="onSelectionDone($event)"></datepicker>
                </div>
            </div>
        </div>
    </div>
</div>

  `,
  styles: [],
  host: {
'(document:click)': 'onClick($event)',
}
})
export class AboutUSComponent  {

  pageTitle: string = 'About us';
//
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
  public dateDisabled: {date: Date, mode: string}[];
  public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened: boolean = false;
 
  public constructor() {
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      {date: this.tomorrow, status: 'full'},
      {date: this.afterTomorrow, status: 'partially'}
    ];
  }
 
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
 
  public today(): void {
    this.dt = new Date();
  }
 
  public d20090824(): void {
    this.dt = moment('2009-08-24', 'YYYY-MM-DD')
      .toDate();
  }
 
  public disableTomorrow(): void {
    this.dateDisabled = [{date: this.tomorrow, mode: 'day'}];
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
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  }
 
  public open(): void {
    this.opened = !this.opened;
  }
 
  public clear(): void {
    this.dt = void 0;
    this.dateDisabled = undefined;
  }
 
  public toggleMin(): void {
    this.dt = new Date(this.minDate.valueOf());
  }

}
