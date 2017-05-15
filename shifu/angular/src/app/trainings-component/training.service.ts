import { Injectable } from '@angular/core';
import { Http, Response,RequestOptionsArgs } from '@angular/http';
import { ITraining } from '../trainings-component/training';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class TrainingService {

  //private _trainingURL = 'api/trainings/training.json';
  private _trainingURL = 'http://10.2.122.111:3000/trainings';
<<<<<<< HEAD
  private _trainingURLs = 'http://10.2.122.111:3000/training';
  //private _trainingURLs = 'api/trainings/trainingShowData.json';
=======
  private _trainingURLs = 'api/trainings/trainingShowData.json';
>>>>>>> origin/master


  getTrainings(pageNumber: number,recordPerPage: number): Observable<ITraining[]> {
    console.log('Called -->getTrainings');
    console.log(this._trainingURL+'?p='+pageNumber+'&n='+recordPerPage);
    return this._http.get(this._trainingURL+'?p='+pageNumber+'&n='+recordPerPage)
      .map((response: Response) => <ITraining[]>response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  };

  getTraining(trainingId: string): Observable<ITraining[]>{
    console.log('Called -->getTraining');
    console.log(this._trainingURLs+"/"+trainingId);
    return this._http1.get(this._trainingURLs+"/"+trainingId)
      .map((response1: Response) => <ITraining[]>response1.json())
      .do(data1 => console.log('ALL getTraining:' + JSON.stringify(data1)))
      .catch(this.handleError);
  };

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  constructor(private _http: Http,private _http1: Http) {
  }

}
