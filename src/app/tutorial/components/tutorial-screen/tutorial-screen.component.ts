import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import LeaderLine from 'leader-line-new';
import { TutorialScreen } from '../../components/tutorial-screen/tutorial-screen.types';
import { ModalService } from '../../services/modal.service';
import { TutorialService } from '../../services/tutorial.service';

@Component({
  selector: 'app-tutorial-screen',
  templateUrl: './tutorial-screen.component.html',
  styleUrl: './tutorial-screen.component.scss',
  standalone: false,
})
export class TutorialScreenComponent implements AfterViewInit {
  tutorialItems: TutorialScreen[] = []; // Stores the list of tutorial screens
  selectedItem: TutorialScreen | null = null; // Currently selected tutorial screen
  leaderLine: LeaderLine | null = null; // Stores the LeaderLine instance
  toggleModal: boolean = false; // Controls the modal state

  @ViewChild('contentBox', { static: false }) contentBox!: ElementRef; // Reference to the content box element
  @ViewChildren('button') buttons!: QueryList<ElementRef>; // References to all tutorial buttons
  isOpenContent: any;

  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    private router: Router,
    private tutorialService: TutorialService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    const storedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.translateService.use(storedLang);

    // Listen for modal state changes
    this.modalService.modalState$.subscribe((isOpen) => {
      this.toggleModal = isOpen;
    });

    // Reload tutorial screens on language change
    this.translateService.onLangChange.subscribe(() => {
      this.loadTutorialScreens();
    });

    this.loadTutorialScreens();
  }

  // Fetch tutorial screens from the service
  loadTutorialScreens(): void {
    this.tutorialService.getTutorialScreens().subscribe((data) => {
      this.tutorialItems = data;
      this.selectedItem = this.tutorialItems[0];
      this.cdr.detectChanges(); // Detect changes to update view
      setTimeout(() => this.drawArrow(), 500); // Draw arrow after view updates
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawArrow(), 500); // Ensure arrow is drawn after view initialization
  }

  ngAfterViewChecked(): void {
    if (this.selectedItem && !this.leaderLine) {
      this.drawArrow(); // Redraw the arrow if missing
    }
  }

  // Selects a tutorial screen and redraws the arrow
  selectItem(item: TutorialScreen): void {
    if (item.id === '5') {
      // Use the unique ID for the "Chat" button
      this.router.navigate(['/chat']); // Navigate to the /chat route
    } else {
      this.selectedItem = item;
      this.cdr.detectChanges();
      setTimeout(() => this.drawArrow(), 500);
    }
  }

  // Dynamically sets content margins based on screen width and content length
  setContentMargins(item: any) {
    let topMargin = '20px';

    if (window.innerWidth <= 768) {
      if (item.content.length > 150) {
        topMargin = '5px';
      } else if (item.content.length > 100) {
        topMargin = '15px';
      } else {
        topMargin = '40px';
      }
    } else {
      if (item.content.length > 150) {
        topMargin = '0px';
      } else if (item.content.length > 100) {
        topMargin = '20px';
      } else {
        topMargin = '100px';
      }
    }

    return {
      'margin-top': topMargin,
      'margin-bottom': '10px',
    };
  }

  // Draws a guiding arrow between the content box and the selected button
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

    // Remove existing arrow if present
    if (this.leaderLine) {
      this.leaderLine.remove();
    }

    // Create new LeaderLine
    this.leaderLine = new LeaderLine(contentElement, buttonElement, {
      path: 'fluid',
      startPlug: 'square',
      endPlug: 'arrow2',
      color: '#ffffff',
      size: 2,
      dropShadow: true,
      startSocket: 'right',
      endSocket: 'left',
    });

    // Ensure the arrow appears on top of other elements
    const leaderLineElement = document.querySelector('.leader-line') as HTMLElement;
    if (leaderLineElement) {
      leaderLineElement.style.zIndex = '9999';
    }
  }

  // Closes the tutorial and navigates to the home screen
  closeTutorial(): void {
    this.router.navigate(['/']);
  }

  // Sanitizes an SVG string to be safely used in the template
  sanitize(svgString: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgString);
  }

  // Formats labels by breaking them into two lines if they are too long
  formatLabel(label: string): string {
    if (label.length > 14) {
      return label.slice(0, 14) + '<br>' + label.slice(14);
    }
    return label;
  }

  // Formats tutorial content by highlighting bold text
  formatContent(content: string): SafeHtml {
    if (!content) return '';
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<span class="red-highlight">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
  }
}
