import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule, LibModalModule,  } from 'nextsapien-component-lib';
import { TutorialScreenComponent } from './components/tutorial-screen/tutorial-screen.component';
import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialComponent } from './tutorial.component';


@NgModule({
  declarations: [TutorialComponent, TutorialScreenComponent], // ✅ Make sure both components are here
  imports: [CommonModule, TutorialRoutingModule, ButtonsModule, LibModalModule], // ✅ Ensure required modules are imported
  exports: [TutorialComponent, TutorialScreenComponent],
})
export class TutorialModule {}
