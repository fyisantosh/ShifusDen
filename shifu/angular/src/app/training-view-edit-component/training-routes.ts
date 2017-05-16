import { Routes } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
export const TRAINING_ROUTE:Routes=[
{path:'active',component: UserListComponent},
{path:'completed',component: UserListComponent},
{path:'abandoned',component: UserListComponent}
];