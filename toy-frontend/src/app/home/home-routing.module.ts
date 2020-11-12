import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/component/home/home.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CanDeactivateGuard } from '../guard/can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'landing-page',
        component: LandingPageComponent
      },
      {
        path: 'quiz',
        component: QuizComponent,
        canDeactivate: [CanDeactivateGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'landing-page',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
