import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { ITraining } from '../trainings-component/training';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TrainingService {

  private _trainingURL = 'api/trainings/training.json';
  //private _trainingURL = 'http://10.2.122.111:3000/trainings';
  private _trainingURLs = 'api/trainings/trainingShowData.json';

  getTrainings(): Observable<ITraining[]> {
    return this._http.get(this._trainingURL)
    .map((response: Response) => <ITraining[]>response.json())
    .do(data => console.log('ALL:'+JSON.stringify(data)))
    .catch(this.handleError);
  };

 getTraining(trainingId:string): Observable<ITraining> {
    return this.getTrainings()
    .map((trainings: ITraining[]) => trainings.find(p => p._id == trainingId));
  };
 
  private handleError(error:Response){
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
  }
  constructor(private _http: Http) {
  }

}
