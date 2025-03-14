import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'tutorial', component: TutorialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
