import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TutorialScreen } from '../../components/tutorial-screen/tutorial-screen.types';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-screen',
  templateUrl: './tutorial-screen.component.html',
  styleUrl: './tutorial-screen.component.scss',
})
export class TutorialScreenComponent {
  tutorialItems: TutorialScreen[] = [];
  selectedItem: TutorialScreen | null = null;

  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    private tutorialService: TutorialService,
  ) {}

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
  formatContent(content: string): SafeHtml {
    if (!content) return '';

    // Replace [[text]] with <span class="custom-highlight">text</span>
    const formattedContent = content.replace(/\[\[(.*?)\]\]/g, '<span class="custom-highlight">$1</span>');

    return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
  }
}
