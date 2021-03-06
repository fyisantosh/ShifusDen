import { Component, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Input } from '@angular/core';

@Component({
  selector: 'app-training-addition-component',
  templateUrl: './training-addition-component.component.html',
  styleUrls: ['./training-addition-component.component.css']
})
export class TrainingAdditionComponent implements OnInit, OnChanges {
  pageTitle :string ='Add new training';
  imgURL:string;
  constructor(private route: ActivatedRoute, private _router: Router) { }
  @Input() test :string;
  ngOnInit() {
  }

 ngOnChanges() {
   alert('something changed!');
 }

/*
 onBack(){
    this._router.navigate(['/welcome']);
  }
*/

}
