import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tutorial-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tutorial-screen.component.html',
  styleUrl: './tutorial-screen.component.scss',
})
export class TutorialScreenComponent {
  tutorialItems = [
    { label: 'Forfeit', content: 'Forfeit Content', icon: 'assets/icons/forfeit.svg' },
    { label: 'Help', content: 'Help Content', icon: 'assets/icons/help.svg' },
    { label: 'Prep', content: 'Prep Content', icon: 'assets/icons/prep.svg' },
    { label: 'Location', content: 'Location Content', icon: 'assets/icons/location.svg' },
    { label: 'Chat', content: 'Chat Content', icon: 'assets/icons/chat.svg' },
    { label: 'More', content: 'More Content', icon: 'assets/icons/more.svg' },
    { label: 'Begin', content: 'Begin Content', icon: 'assets/icons/begin.svg' },
    { label: 'Outfit', content: 'Outfit Content', icon: 'assets/icons/outfit.svg' },
    { label: 'Video', content: 'Video Content', icon: 'assets/icons/video.svg' },
    { label: 'Face', content: 'Face Content', icon: 'assets/icons/face.svg' }
  ];

  selectedItem = this.tutorialItems[0]; // Default selection

  selectItem(item: any) {
    this.selectedItem = item;
  }
}
