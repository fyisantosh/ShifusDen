import { Routes } from '@angular/router';
import { UserListComponent } from '../user-list/trainee-components/user-list.component';
export const TRAINING_ROUTE:Routes=[
{ path: '', redirectTo: 'active', pathMatch: 'full'},
{path:'active',component: UserListComponent},
{path:'completed',component: UserListComponent},
{path:'abandoned',component: UserListComponent}
];