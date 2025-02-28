import { CommonModule } from '@angular/common'; // ✅ Import this
import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-screen',
  standalone: true,
  templateUrl: './tutorial-screen.component.html',
  styleUrl: './tutorial-screen.component.scss',
  imports: [CommonModule], // ✅ Add CommonModule here
})
export class TutorialScreenComponent {
  tutorialItems = [
    { label: 'Forfeit', content: 'Forfeit Content' },
    { label: 'Help', content: 'Help Content' },
    { label: 'Prep', content: 'Prep Content' },
    { label: 'Location', content: 'Location Content' },
    { label: 'Chat', content: 'Chat Content' },
    { label: 'More', content: 'More Content' },
  ];

  selectedItem = this.tutorialItems[0]; // Default selection

  selectItem(item: any) {
    this.selectedItem = item;
  }
}
