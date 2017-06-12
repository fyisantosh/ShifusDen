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
  private _assignURL = 'http://10.2.122.111:3000/trainees';

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
    let url = this._userURL + '?f=' + fname + '&l=' + lname + '&ps=' + psno + '&wt=1&t=s&tp1=tp1';
    console.log(url);
    return this._http.get(url)
      .map((response: Response) => <ITrainee[]>response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  }

    getUsersList(pageNumber: number,recordPerPage: number,queryString: string): Observable<ITrainee[]> {
    console.log('Called -->getUsersList');
    let url=this._userURL+'?p='+pageNumber+'&n='+recordPerPage+'&t=s'+'&timestamp='+ Date.now();
     if(queryString!=null){
        url=url+'&f='+queryString+'&l='+queryString+'&ps='+queryString+'&o='+queryString;
    }
    console.log(url);
    return this._http.get(url)
      .map((response: Response) => <ITrainee[]>response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  };

  addUsertoTraining11(traineeDetails: ITrainingTrainee): Observable<Response> {
    alert('Called -->addUsertoTraining');
    console.log('Called -->addUsertoTraining');
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    alert(this._traineeURL);
    let addurl = this._traineeURL + '/' + traineeDetails.trainingId + '/trainees';
    alert(addurl);
    return this._http.put(addurl, JSON.stringify(traineeDetails), options)
   .map((response: Response) => response.json())
      .do(data => console.log('ALL getTrainings:' + JSON.stringify(data)))
      .catch(this.handleError);
  }


  addUsertoTraining (traineeDetails: ITrainingTrainee): Observable<Response> {
        //let testUrl='http://10.2.122.111:3000/trainees?f=a&l=h&ps=&wt=1&t=s&tp1=tp1';
        
        let bodyString = JSON.stringify(traineeDetails); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); // Create a request option
        let addurl = this._traineeURL + '/' + traineeDetails.trainingId + '/trainees';
         
        let test=this._http.put(`${addurl}`, bodyString, options) // ...using put request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any

        console.log(test);
        return test;  

    }   

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
  constructor(private _http: Http) {
  }

}
