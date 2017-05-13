import { Injectable } from '@angular/core';
import { CanDeactivate,RouterStateSnapshot,ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { TrainingsComponent } from '../trainings-component/trainings-component.component';

@Injectable()
export class TrainingAditionGuard implements CanDeactivate<TrainingsComponent> {

    constructor(private _router: Router) {
    }

    canDeactivate(component: TrainingsComponent, 
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
    console.log("Guard reached");
    console.log(route.params);
    console.log(state.url);
    return window.confirm("Are you sure?");
  }
}
