export interface ITrainee {
     _id:string,
    psno:number,
    name: {first: string,last:string};
    first_name:string,
    last_name:string,
    opco:string;
    email: string;
    phone: string;
    tId:string;
    status_date:Date;
    target_date:Date;
    status:string;
}
