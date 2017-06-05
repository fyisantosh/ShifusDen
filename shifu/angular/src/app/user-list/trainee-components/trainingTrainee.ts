export interface ITrainingTrainee {
    trainingId:string,
    updatedStatus:string,
    psnos:number[],
    name: {first: string,last:string};
    status_date:Date;
    target_date:Date;
}
