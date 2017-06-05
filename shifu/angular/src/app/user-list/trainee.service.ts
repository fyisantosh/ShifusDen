import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { ITrainee } from '../user-list/trainee';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { ITrainingTrainee } from '../user-list/trainee-components/trainingTrainee';

@Injectable()
export class TraineeService {

  private _traineeURL = 'http://10.2.122.111:3000/training';
  private _userURL = 'http://10.2.122.111:3000/trainees';

  getTrainees(trainingId: string, trainingStatus: string): Observable<ITrainee[]> {
    console.log('Called -->getTrainees');
    let url = this._traineeURL + '/' + trainingId + '/trainees?s=' + trainingStatus;
    console.log(url);
    return this._http.get(url)
      .map((response: Response) => <ITrainee[]>response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  };

  searchUser(fname: string, lname: string, psno: string) {
    console.log('Called -->searchUser');
    let url = this._userURL + '?f=' + fname + '&l=' + lname + '&ps=' + psno + '&wt=1&t=s';
    console.log(url);
    return this._http.get(url)
      .map((response: Response) => <ITrainee[]>response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  addUsertoTraining(traineeDetails: ITrainingTrainee) {
    console.log('Called -->addUsertoTraining');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let url = this._traineeURL + '/' + traineeDetails.trainingId + '/trainees';
    return this._http.post(url, traineeDetails, options)
      .map((response: Response) => response.json())
      .do(data => console.log('addUsertoTraining:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  constructor(private _http: Http, private _http1: Http) {
  }

}
