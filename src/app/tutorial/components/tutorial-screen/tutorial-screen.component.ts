// import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
// import LeaderLine from 'leader-line-new';
// import { TutorialScreen } from '../../components/tutorial-screen/tutorial-screen.types';
// import { TutorialService } from '../../services/tutorial.service';

// @Component({
//   selector: 'app-tutorial-screen',
//   templateUrl: './tutorial-screen.component.html',
//   styleUrl: './tutorial-screen.component.scss',
//   standalone: false,
// })
// export class TutorialScreenComponent implements AfterViewInit {
//   tutorialItems: TutorialScreen[] = [];
//   selectedItem: TutorialScreen | null = null;
//   leaderLine: LeaderLine | null = null;

//   @ViewChild('contentBox', { static: false }) contentBox!: ElementRef;
//   @ViewChildren('button') buttons!: QueryList<ElementRef>;

//   constructor(
//     @Inject(DomSanitizer) private sanitizer: DomSanitizer,
//     private tutorialService: TutorialService,
//     private cdr: ChangeDetectorRef,
//   ) {}

//   ngOnInit(): void {
//     this.tutorialService.getTutorialScreens().subscribe((data) => {
//       this.tutorialItems = data;
//       this.selectedItem = this.tutorialItems[0]; // Default selection
//       this.cdr.detectChanges(); // Force change detection
//       setTimeout(() => this.drawArrow(), 500); // Give DOM time to render
//     });
//   }

//   ngAfterViewInit(): void {
//     setTimeout(() => this.drawArrow(), 500); // Give DOM time to render
//   }

//   ngAfterViewChecked(): void {
//     if (this.selectedItem && !this.leaderLine) {
//       this.drawArrow();
//     }
//   }

//   selectItem(item: TutorialScreen): void {
//     this.selectedItem = item;
//     this.cdr.detectChanges(); // Force change detection
//     setTimeout(() => this.drawArrow(), 500); // Redraw the arrow after selection
//   }

//   drawArrow(): void {
//     const contentElement = this.contentBox?.nativeElement;
//     const buttonIndex = this.tutorialItems.indexOf(this.selectedItem!);

//     if (buttonIndex === -1 || buttonIndex >= this.buttons.length) {
//       return;
//     }

//     const buttonWrapper = this.buttons.get(buttonIndex);
//     const buttonElement = buttonWrapper?.nativeElement;

//     if (!contentElement || !buttonElement) {
//       return;
//     }

//     if (this.leaderLine) {
//       this.leaderLine.remove();
//     }

//     // Get bounding rectangles
//     const contentRect = contentElement.getBoundingClientRect();
//     const buttonRect = buttonElement.getBoundingClientRect();

//     // Compute the actual content width (considering padding & dynamic text length)
//     const computedStyle = window.getComputedStyle(contentElement);
//     const contentWidth = contentElement.scrollWidth; // Actual content width
//     const paddingRight = parseFloat(computedStyle.paddingRight);

//     // Dynamically determine the starting position (end of the content)
//     const startX = contentRect.left + contentWidth + paddingRight;
//     const startY = contentRect.top + contentRect.height / 2; // Center Y-axis of content

//     // Dynamically determine the ending position (center of the button)
//     const endX = buttonRect.left + buttonRect.width / 2;
//     const endY = buttonRect.top + buttonRect.height / 2;

//     // Create a virtual start point
//     const startMarker = document.createElement('div');
//     startMarker.style.position = 'absolute';
//     startMarker.style.left = `${startX}px`;
//     startMarker.style.top = `${startY}px`;
//     startMarker.style.width = '1px';
//     startMarker.style.height = '1px';
//     startMarker.style.visibility = 'hidden';
//     document.body.appendChild(startMarker); // Append it to the body to position it correctly

//     // Create the arrow using LeaderLine
//     this.leaderLine = new LeaderLine(
//       LeaderLine.pointAnchor(startMarker, { x: 0, y: 0 }), // Start at the correct position
//       LeaderLine.pointAnchor(buttonElement, { x: 0, y: 0 }), // End at the correct button center
//       {
//         path: 'fluid',
//         startPlug: 'behind',
//         endPlug: 'arrow2',
//         color: '#ffffff',
//         size: 2,
//         dropShadow: true,
//         startSocket: 'right',
//         endSocket: 'left',
//       },
//     );

//     const leaderLineElement = document.querySelector('.leader-line') as HTMLElement;
//     if (leaderLineElement) {
//       leaderLineElement.style.zIndex = '9999';
//     }
//   }

//   closeTutorial(): void {
//     console.log('Tutorial closed');
//   }

//   sanitize(svgString: string): SafeHtml {
//     return this.sanitizer.bypassSecurityTrustHtml(svgString);
//   }

//   formatLabel(label: string): string {
//     if (label.length > 14) {
//       return label.slice(0, 14) + '<br>' + label.slice(14);
//     }
//     return label;
//   }

//   formatContent(content: string): SafeHtml {
//     if (!content) return '';

//     const formattedContent = content.replace(/\[\[(.*?)\]\]/g, '<span class="custom-highlight">$1</span>');

//     return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
//   }
// }

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import LeaderLine from 'leader-line-new';
import { TutorialScreen } from '../../components/tutorial-screen/tutorial-screen.types';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-screen',
  templateUrl: './tutorial-screen.component.html',
  styleUrl: './tutorial-screen.component.scss',
  standalone: false,
})
export class TutorialScreenComponent implements AfterViewInit {
  tutorialItems: TutorialScreen[] = [];
  selectedItem: TutorialScreen | null = null;
  leaderLine: LeaderLine | null = null;

  @ViewChild('contentBox', { static: false }) contentBox!: ElementRef;
  @ViewChildren('button') buttons!: QueryList<ElementRef>;

  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    private tutorialService: TutorialService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService, // ✅ Inject TranslateService to listen for language changes
  ) {}

  ngOnInit(): void {
    // ✅ Fetch the selected language from localStorage (same as IntroComponent)
    const storedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.translateService.use(storedLang); // Ensure translation service is set to the stored language

    // ✅ Subscribe to language changes & update tutorial data dynamically
    this.translateService.onLangChange.subscribe(() => {
      this.loadTutorialScreens();
    });

    this.loadTutorialScreens(); // Initial data load
  }

  /**
   * ✅ Fetch localized tutorial data whenever language changes
   */
  loadTutorialScreens(): void {
    this.tutorialService.getTutorialScreens().subscribe((data) => {
      this.tutorialItems = data;
      this.selectedItem = this.tutorialItems[0]; // Default selection
      this.cdr.detectChanges(); // Force change detection
      setTimeout(() => this.drawArrow(), 500); // Give DOM time to render
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawArrow(), 500); // Give DOM time to render
  }

  ngAfterViewChecked(): void {
    if (this.selectedItem && !this.leaderLine) {
      this.drawArrow();
    }
  }

  selectItem(item: TutorialScreen): void {
    this.selectedItem = item;
    this.cdr.detectChanges(); // Force change detection
    setTimeout(() => this.drawArrow(), 500); // Redraw the arrow after selection
  }

  drawArrow(): void {
    const contentElement = this.contentBox?.nativeElement;
    const buttonIndex = this.tutorialItems.indexOf(this.selectedItem!);

    if (buttonIndex === -1 || buttonIndex >= this.buttons.length) {
      return;
    }

    const buttonWrapper = this.buttons.get(buttonIndex);
    const buttonElement = buttonWrapper?.nativeElement;

    if (!contentElement || !buttonElement) {
      return;
    }

    if (this.leaderLine) {
      this.leaderLine.remove();
    }

    const contentRect = contentElement.getBoundingClientRect();
    const buttonRect = buttonElement.getBoundingClientRect();

    const computedStyle = window.getComputedStyle(contentElement);
    const contentWidth = contentElement.scrollWidth;
    const paddingRight = parseFloat(computedStyle.paddingRight);

    const startX = contentRect.left + contentWidth + paddingRight;
    const startY = contentRect.top + contentRect.height / 2;

    const endX = buttonRect.left + buttonRect.width / 2;
    const endY = buttonRect.top + buttonRect.height / 2;

    const startMarker = document.createElement('div');
    startMarker.style.position = 'absolute';
    startMarker.style.left = `${startX}px`;
    startMarker.style.top = `${startY}px`;
    startMarker.style.width = '1px';
    startMarker.style.height = '1px';
    startMarker.style.visibility = 'hidden';
    document.body.appendChild(startMarker);

    this.leaderLine = new LeaderLine(LeaderLine.pointAnchor(startMarker, { x: 0, y: 0 }), LeaderLine.pointAnchor(buttonElement, { x: 0, y: 0 }), {
      path: 'fluid',
      startPlug: 'behind',
      endPlug: 'arrow2',
      color: '#ffffff',
      size: 2,
      dropShadow: true,
      startSocket: 'right',
      endSocket: 'left',
    });

    const leaderLineElement = document.querySelector('.leader-line') as HTMLElement;
    if (leaderLineElement) {
      leaderLineElement.style.zIndex = '9999';
    }
  }

  closeTutorial(): void {
    console.log('Tutorial closed');
  }

  sanitize(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  formatLabel(label: string): string {
    if (label.length > 14) {
      return label.slice(0, 14) + '<br>' + label.slice(14);
    }
    return label;
  }

  formatContent(content: string): SafeHtml {
    if (!content) return '';

    const formattedContent = content.replace(/\[\[(.*?)\]\]/g, '<span class="custom-highlight">$1</span>');

    return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
  }
}
