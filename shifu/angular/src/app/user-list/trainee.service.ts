import { Injectable } from '@angular/core';
import { Http, Response,RequestOptionsArgs } from '@angular/http';
import { ITrainee } from '../user-list/trainee';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TraineeService {

  private _traineeURL = 'http://10.2.122.111:3000/training';
  
  getTrainees(trainingId: string,trainingStatus: string): Observable<ITrainee[]> {
    console.log('Called -->getTrainees');
    let url=this._traineeURL+'/'+trainingId+'/trainees?s='+trainingStatus;
    console.log(url);
    return this._http.get(url)
      .map((response: Response) => <ITrainee[]>response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  };

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  constructor(private _http: Http,private _http1: Http) {
  }

}
