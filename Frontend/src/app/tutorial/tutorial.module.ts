import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule, LibAutoDelegationModalComponent, LibModalModule } from 'nextsapien-component-lib';
import { TutorialScreenComponent } from './components/tutorial-screen/tutorial-screen.component';
import { TutorialRoutingModule } from './tutorial-routing.module';
import { TutorialComponent } from './tutorial.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [TutorialComponent, TutorialScreenComponent,ChatComponent], // ✅ Make sure both components are here
  imports: [CommonModule, TutorialRoutingModule, ButtonsModule, LibModalModule, LibAutoDelegationModalComponent], // ✅ Ensure required modules are imported
  exports: [TutorialComponent, TutorialScreenComponent],
  providers: [LibAutoDelegationModalComponent],
})
export class TutorialModule {}
