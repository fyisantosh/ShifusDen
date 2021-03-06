import { Component, OnInit } from '@angular/core';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-welcome-component',
  template: `
   <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/welcome']">Home</a></li>
                    <li><a [routerLink]="['/userlist']">Users List</a></li>
                    <li><a [routerLink]="['/aboutUs']">About us</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>     
  `,
  styles: []
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
