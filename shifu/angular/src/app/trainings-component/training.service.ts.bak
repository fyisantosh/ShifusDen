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
  private _trainingsURL = 'http://10.2.122.111:3000/trainings';
  private _trainingURL = 'http://10.2.122.111:3000/training';
  private _trainingStatsURL = 'http://10.2.122.111:3000/stats/training/';
  //private _trainingURLs = 'api/trainings/trainingShowData.json';


  getTrainings(pageNumber: number,recordPerPage: number,queryString: string): Observable<ITraining[]> {
    console.log('Called -->getTrainings');
    let url=this._trainingsURL+'?p='+pageNumber+'&n='+recordPerPage+'&timestamp='+ Date.now();
    if(queryString!=null){
        url=url+'&q='+queryString;
    }
    console.log(url);
    return this._http.get(url)
      .map((response: Response) => <ITraining[]>response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  };

  getTraining(trainingId: string): Observable<ITraining[]>{
    console.log('Called -->getTraining');
    console.log(this._trainingURL+"/"+trainingId);
    return this._http1.get(this._trainingURL+"/"+trainingId)
      .map((response1: Response) => <ITraining[]>response1.json())
      .do(data1 => console.log('ALL getTraining:' + JSON.stringify(data1)))
      .catch(this.handleError);
  };

  getTrainingStats(trainingId: string): Observable<Response>{
    console.log('Called -->getTrainingStats');
    console.log(this._trainingStatsURL+"/"+trainingId);
    return this._http1.get(this._trainingURL+"/"+trainingId)
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
