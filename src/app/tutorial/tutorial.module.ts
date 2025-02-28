import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TutorialScreenComponent } from './components/tutorial-screen/tutorial-screen.component';
import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialComponent } from './tutorial.component';

@NgModule({
  imports: [CommonModule, TutorialRoutingModule, TutorialComponent, TutorialScreenComponent],
  exports: [TutorialComponent],
})
export class TutorialModule {}
