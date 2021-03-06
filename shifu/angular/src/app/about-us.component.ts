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
     
  `,
  styles: [],
  host: {
'(document:click)': 'onClick($event)',
}
})
export class AboutUSComponent  {

  pageTitle: string = 'About us';

}
