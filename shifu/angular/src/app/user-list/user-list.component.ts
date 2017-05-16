import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  tab: string;
  id:string;
  constructor(private router:Router,private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
       this.id = params['id'];
    });

   if(this.router.url.indexOf('active')!== -1){
     this.tab='active';
   }
   else if (this.router.url.indexOf('completed')!== -1){
     this.tab='completed';
   }
   else{
      this.tab='abandoned';
   }
  }

  ngOnInit() {
  }



}
