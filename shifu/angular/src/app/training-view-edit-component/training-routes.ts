import { Routes } from '@angular/router';
import { TraineeListComponent } from '../user-list/trainee-components/trainee-list.component';
export const TRAINING_ROUTE:Routes=[
{ path: '', redirectTo: 'active', pathMatch: 'full'},
{path:'active',component: TraineeListComponent},
{path:'completed',component: TraineeListComponent},
{path:'abandoned',component: TraineeListComponent}
];