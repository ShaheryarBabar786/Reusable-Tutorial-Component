import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialComponent } from './tutorial.component';
import { ChatComponent } from './chat/chat.component'; // Import the ChatComponent

const routes: Routes = [
  { path: '', component: TutorialComponent }, // Default route for the tutorial module
  { path: 'chat', component: ChatComponent }, // Add the Chat route
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorialRoutingModule {}
