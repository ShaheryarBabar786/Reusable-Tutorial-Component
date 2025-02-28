import { Component } from '@angular/core';
import { TutorialScreenComponent } from './components/tutorial-screen/tutorial-screen.component';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [TutorialScreenComponent],
  templateUrl: './tutorial.component.html',
})
export class TutorialComponent {}
