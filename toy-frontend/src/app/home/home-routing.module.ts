import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/component/home/home.component';
import { QuizComponent } from './component/quiz/quiz.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { ProfileComponent } from './component/profile/profile.component';

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
        component: QuizComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'profile',
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
