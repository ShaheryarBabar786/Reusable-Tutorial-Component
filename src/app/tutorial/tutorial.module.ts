import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from 'nextsapien-component-lib';
import { TutorialScreenComponent } from './components/tutorial-screen/tutorial-screen.component';
import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialComponent } from './tutorial.component';

@NgModule({
  declarations: [TutorialComponent, TutorialScreenComponent], // ✅ Make sure both components are here
  imports: [CommonModule, TutorialRoutingModule, ButtonsModule], // ✅ Ensure required modules are imported
})
export class TutorialModule {}
