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
  selectedItem: TutorialScreen | null = null;

  constructor(private sanitizer: DomSanitizer, private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.tutorialService.getTutorialScreens().subscribe((data) => {
      this.tutorialItems = data;
      this.selectedItem = this.tutorialItems[0];
    });
  }

  sanitize(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  selectItem(item: TutorialScreen): void {
    this.selectedItem = item;
    console.log(Selected tutorial: ${item.label});
  }

  closeTutorial(): void {
    console.log('Tutorial closed');
  }

  formatLabel(label: string): string {
    if (label.length > 14) {
      return label.slice(0, 14) + '<br>' + label.slice(14);
    }
    return label;

}
