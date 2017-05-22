import {  PipeTransform, Pipe } from '@angular/core';
import {ITrainee} from '../user-list/trainee';

@Pipe({
    name: 'traineeFilter'
})
export class TraineeFilterPipe implements PipeTransform {

    transform(value: ITrainee[], filterBy: string): ITrainee[] {
        console.log(filterBy);
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((trainee: ITrainee) =>
            trainee.first_name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
