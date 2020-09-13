import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './component/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { QuizComponent } from './component/quiz/quiz.component';
import { LandingPageComponent } from './component/landing-page/landing-page.component';
import { ProfileComponent } from './component/profile/profile.component';


@NgModule({
  declarations: [HomeComponent, QuizComponent, LandingPageComponent, ProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
