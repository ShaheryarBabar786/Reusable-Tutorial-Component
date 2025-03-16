import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
export class TutorialScreenComponent implements AfterViewInit, OnDestroy {
  tutorialItems: TutorialScreen[] = []; // Stores the list of tutorial screens
  selectedItem: TutorialScreen | null = null; // Currently selected tutorial screen
  leaderLine: LeaderLine | null = null; // Stores the LeaderLine instance
  toggleModal: boolean = false; // Controls the modal state

  @ViewChild('contentBox', { static: false }) contentBox!: ElementRef; // Reference to the content box element
  @ViewChildren('button') buttons!: QueryList<ElementRef>; // References to all tutorial buttons
  isOpenContent: any;

  contentClasses: { [key: string]: string } = {
    '1': 'content-1',
    '2': 'content-2',
    '3': 'content-3',
    '4': 'content-4',
    '5': 'content-5',
    '6': 'content-6',
    '7': 'content-7',
    '8': 'content-8',
    '9': 'content-9',
    '10': 'content-10',
    '11': 'content-11',
  };

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
    window.addEventListener('resize', () => {
      this.cdr.detectChanges(); // Trigger change detection
    });
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

  getContentClass(item: any): string {
    return this.contentClasses[item.id] || '';
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawArrow(), 500); // Ensure arrow is drawn after view initialization
  }

  ngAfterViewChecked(): void {
    if (this.selectedItem && !this.leaderLine) {
      this.drawArrow(); // Redraw the arrow if missing
    }
  }
  ngOnDestroy(): void {
    // Clean up the LeaderLine instance when the component is destroyed
    if (this.leaderLine) {
      this.leaderLine.remove();
      this.leaderLine = null;
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
    // Default margins and alignment
    let topMargin = '20px';
    let bottomMargin = '10px';
    let textAlign = 'left';

    console.log('Selected Item:', item); // Debug: Log the selected item

    // Use custom spacing and alignment if provided in the JSON
    if (item.spacing) {
      const isMobile = window.innerWidth <= 768;
      console.log('Is Mobile:', isMobile); // Debug: Log whether it's mobile or desktop

      const spacing = isMobile ? item.spacing.mobile : item.spacing.desktop;
      console.log('Spacing:', spacing); // Debug: Log the spacing object

      if (spacing) {
        topMargin = spacing.top || topMargin;
        bottomMargin = spacing.bottom || bottomMargin;
        textAlign = spacing.textAlign || textAlign;
      }
    }

    const margins = {
      'margin-top': topMargin,
      'margin-bottom': bottomMargin,
      'text-align': textAlign,
    };

    console.log('Computed Margins:', margins); // Debug: Log the computed margins
    return margins;
  }

  // Draws a guiding arrow between the content box and the selected button
  drawArrow(): void {
    // Check if the content box and selected button exist
    if (!this.contentBox?.nativeElement || !this.selectedItem) {
      return;
    }

    const contentElement = this.contentBox.nativeElement;
    const buttonIndex = this.tutorialItems.indexOf(this.selectedItem);

    if (buttonIndex === -1 || buttonIndex >= this.buttons.length) {
      return;
    }

    const buttonWrapper = this.buttons.get(buttonIndex);
    const buttonElement = buttonWrapper?.nativeElement;

    // Ensure both elements exist and are connected to the DOM
    if (!contentElement || !buttonElement || !contentElement.isConnected || !buttonElement.isConnected) {
      return;
    }

    // Remove existing arrow if present
    if (this.leaderLine) {
      this.leaderLine.remove();
      this.leaderLine = null; // Reset the leaderLine instance
    }

    // Get arrow design from the selected item (fallback to defaults if not provided)
    const arrowDesign = this.selectedItem.arrowDesign || {
      color: '#ffffff',
      size: 2,
      path: 'fluid',
      startSocket: 'bottom',
      endSocket: 'left',
    };

    // Create new LeaderLine with dynamic arrow design
    this.leaderLine = new LeaderLine(contentElement, buttonElement, {
      path: arrowDesign.path || 'fluid',
      startPlug: 'square',
      startPlugSize: 0,
      endPlug: 'arrow3',
      color: arrowDesign.color || '#ffffff',
      size: arrowDesign.size || 1,
      endPlugSize: 5,
      endPlugColor: 'transparent',
      endPlugOutline: true,
      endPlugOutlineColor: '#ffffff',
      endPlugOutlineSize: 1,
      dropShadow: {
        color: '#ffffff',
        dx: 0,
        dy: 0,
        blur: 6,
      },
      startSocket: arrowDesign.startSocket || 'bottom',
      endSocket: arrowDesign.endSocket || 'left',
    });

    // Ensure the arrow appears on top of other elements
    const leaderLineElement = document.querySelector('.leader-line') as HTMLElement;
    if (leaderLineElement) {
      leaderLineElement.style.zIndex = '9999';
    }

    // Apply custom styling to the arrow head
    const arrowHead = document.querySelector('.leader-line-end-plug') as HTMLElement;
    if (arrowHead) {
      arrowHead.style.border = '0.8205px solid #FFFFFF'; // Border
      arrowHead.style.boxShadow = '0px 0px 5.7435px #FFFFFF'; // Box shadow
      arrowHead.style.transform = 'rotate(5.4deg)'; // Rotate the arrow head
    }
  }
  // Closes the tutorial and navigates to the home screen
  closeTutorial(): void {
    // Clean up the LeaderLine instance
    if (this.leaderLine) {
      this.leaderLine.remove();
      this.leaderLine = null;
    }

    // Navigate to the home screen
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

    const chunkSize = 23.5; // Maximum characters per line
    const words = content.split(' '); // Split content into words
    let currentLineLength = 0;
    let formattedContent = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // If adding the current word exceeds the chunk size, start a new line
      if (currentLineLength + word.length > chunkSize && currentLineLength > 0) {
        formattedContent += '<br>'; // Add a line break
        currentLineLength = 0; // Reset the line length
      }

      // Add the word to the current line
      formattedContent += (currentLineLength === 0 ? '' : ' ') + word;
      currentLineLength += word.length + (currentLineLength === 0 ? 0 : 1); // Account for space
    }

    // Highlight bold text (if needed)
    const highlightedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<span class="red-highlight">$1</span>');

    // Sanitize and return the formatted content
    return this.sanitizer.bypassSecurityTrustHtml(highlightedContent);
  }
}
