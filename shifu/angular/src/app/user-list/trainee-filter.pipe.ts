import {  PipeTransform, Pipe } from '@angular/core';
import {ITrainee} from '../user-list/trainee';

@Pipe({
    name: 'traineeFilter'
})
export class TraineeFilterPipe implements PipeTransform {

    transform(value: ITrainee[], filterBy: string): ITrainee[] {
        console.log(filterBy);
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        var result:ITrainee[]=  filterBy ? value.filter((trainee: ITrainee) =>
            trainee.first_name.concat(trainee.last_name).concat(trainee.opco).concat(trainee.psno.toString()).toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
       return result;
    }
}
