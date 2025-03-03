import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TutorialScreen } from '../../components/tutorial-screen/tutorial-screen.types';

@Component({
  selector: 'app-tutorial-screen',

  templateUrl: './tutorial-screen.component.html',
  styleUrl: './tutorial-screen.component.scss',
})
export class TutorialScreenComponent {
  tutorialItems: TutorialScreen[] = [];

  selectedItem: TutorialScreen | null = null; // No default selection

  constructor(private sanitizer: DomSanitizer) {
    this.tutorialItems = [
      {
        id: 1,
        label: 'Forfeit',
        content: 'Forfeit Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" stroke-width="2"/>
          </svg>

        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
      {
        id: 2,
        label: 'Help',
        content: 'Help Content',
        icon: this.sanitize(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm1.07-7.75c-.9.36-1.42.99-1.57 1.75h-2.02c.16-1.17.79-2.16 2.07-2.72.9-.4 1.5-1.12 1.5-2.16 0-1.32-1.08-2.4-2.4-2.4s-2.4 1.08-2.4 2.4H7.9c0-2.44 1.98-4.4 4.4-4.4s4.4 1.98 4.4 4.4c0 1.7-1.1 3.1-2.63 3.75z" fill="white"/>
          </svg>
        `),
      },
    ];

    // Select "Forfeit" by default
    this.selectedItem = this.tutorialItems[0];
  }

  sanitize(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  selectItem(item: TutorialScreen): void {
    this.selectedItem = item;
    console.log(`Selected tutorial: ${item.label}`);
  }

  closeTutorial(): void {
    console.log('Tutorial closed');
  }
}
