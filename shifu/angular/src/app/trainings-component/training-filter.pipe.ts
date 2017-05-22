import {  PipeTransform, Pipe } from '@angular/core';
import {ITraining} from '../trainings-component/training';

@Pipe({
    name: 'trainingFilter'
})
export class TrainingFilterPipe implements PipeTransform {

    transform(value: ITraining[], filterBy: string): ITraining[] {
        console.log(filterBy);
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((product: ITraining) =>
            product.tname.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
