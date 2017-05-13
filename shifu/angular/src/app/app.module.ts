import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TrainingsComponent } from './trainings-component/trainings-component.component';
import { ProductFilterPipe } from './trainings-component/training-filter.pipe';
import { TrainingService } from './trainings-component/training.service';
import { TrainingsStarRatingComponent } from './training-widget-component/trainings-star-rating.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome-component.component';
import { AboutUSComponent } from './about-us.component';
import { TrainingAdditionComponent } from './training-addition-component/training-addition-component.component';
import { TrainingViewEditComponent } from './training-view-edit-component/training-view-edit.component';
import { TrainingAditionGuard } from './training-addition-component/training-addition-guard-service';
@NgModule({
  declarations: [
    AppComponent,
    TrainingsComponent,
    ProductFilterPipe,
    TrainingsStarRatingComponent,
    WelcomeComponent,
    AboutUSComponent,
    TrainingAdditionComponent,
    TrainingViewEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: 'welcome', component: TrainingsComponent },
      { path: 'welcomeGuarded', component: TrainingsComponent },
      { path: 'aboutUs', component: AboutUSComponent },
      { path: 'addtraining', component: TrainingAdditionComponent },
      { path: 'showtraining/:id', component: TrainingViewEditComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
    ])
  ],
  providers: [TrainingService,TrainingAditionGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
