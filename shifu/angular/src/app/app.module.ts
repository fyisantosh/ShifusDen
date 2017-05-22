import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './trainings-component/trainings-component.component';
import { TrainingFilterPipe } from './trainings-component/training-filter.pipe';
import { TrainingService } from './trainings-component/training.service';
import { TrainingsStarRatingComponent } from './training-widget-component/trainings-star-rating.component';
import { RouterModule} from '@angular/router';
import { WelcomeComponent } from './welcome-component.component';
import { AboutUSComponent } from './about-us.component';
import { TrainingAdditionComponent } from './training-addition-component/training-addition-component.component';
import { TrainingViewEditComponent } from './training-view-edit-component/training-view-edit.component';
import { TRAINING_ROUTE } from './training-view-edit-component/training-routes';
import { UserListComponent } from './user-list/user-list.component';
import { TraineeService } from './user-list/trainee.service';
import {TraineeFilterPipe} from './user-list/trainee-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    TrainingFilterPipe,
    TrainingsStarRatingComponent,
    WelcomeComponent,
    AboutUSComponent,
    TrainingAdditionComponent,
    TrainingViewEditComponent,
    UserListComponent,
    TraineeFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'welcome', component: TrainingsComponent },
      { path: 'aboutUs', component: AboutUSComponent },
      { path: 'addtraining', component: TrainingAdditionComponent },
       { path: 'showtraining/:id', component: TrainingViewEditComponent,children:TRAINING_ROUTE  },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  providers: [TrainingService,TraineeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
