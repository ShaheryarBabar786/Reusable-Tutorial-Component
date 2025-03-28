import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  tutorialItems: TutorialScreen[] = [];
  selectedItems: TutorialScreen[] = [];
  leaderLines: LeaderLine[] = [];
  toggleModal: boolean = false;
  selectedIndex: number = 0;
  activeButtonIndices: (number | null)[] = [null, null, null];
  @ViewChildren('contentBox') contentBoxes!: QueryList<ElementRef>;
  @ViewChildren('button') buttons!: QueryList<ElementRef>;
  isOpenContent: any;
  annotatedButtonIds = ['4','5','8','10','11'];
  lensFlareButtonIds = ['2','8','9'];

  // Position configuration
  dotPositionOverrides: {[key: string]: {top: string, right: string}} = {
    '6': { top: '0px', right: '18px' },
    '7': { top: '3px', right: '15px' },
    '8': { top: '-5px', right: '19px' },
    '9':{ top: '0px', right: '0px'},
    '10':{ top: '0px', right: '0px'},
    '11':{ top: '0px', right: '0px'},
    'default': { top: '0px', right: '12px' }
  };
  dotPositionMobileOverrides: {[key: string]: {top: string, right: string}} = {
    '6': { top: '0px', right: '15px' },
    '7': { top: '3px', right: '12px' },
    '8': { top: '0px', right: '9px' },
    '9': { top: '7px', right: '0px' },
    '10': { top: '7px', right: '0px' },
    '11': { top: '7px', right: '0px' },
    'default': { top: '5px', right: '4px' }
  };


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
    this.modalService.modalState$.subscribe((isOpen) => {
      this.toggleModal = isOpen;
    });
    this.activeButtonIndices = [null, null, null];

    this.translateService.onLangChange.subscribe(() => {
      this.loadTutorialScreens();
    });

    this.loadTutorialScreens();
    window.addEventListener('resize', () => {
      this.cdr.detectChanges();
      this.drawArrows();
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.cdr.detectChanges();
    this.drawArrows();
  }

  loadTutorialScreens(): void {
    this.tutorialService.getTutorialScreens().subscribe((data) => {
      this.tutorialItems = data;
      this.selectedItems = this.tutorialItems.slice(0, 3);
      this.selectedIndex = 0;
      this.cdr.detectChanges();
      setTimeout(() => this.drawArrows(), 500);
    });
  }

  getContentClass(item: any): string {
    return this.contentClasses[item.id] || '';
  }

  isMobile(): boolean {
    return window.innerWidth <= 768;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawArrows(), 500);
  }

  ngAfterViewChecked(): void {
    if (this.selectedItems.length > 0 && this.leaderLines.length === 0) {
      this.drawArrows();
    }
  }

  ngOnDestroy(): void {
    this.leaderLines.forEach(line => line.remove());
    this.leaderLines = [];
  }

  selectItem(item: TutorialScreen, buttonIndex: number, containerIndex: number): void {
    if (item.id === '5') {
      this.router.navigate(['/tutorial/chat']);
    } else {
      this.selectedItems[containerIndex] = item;
      if (this.isMobile()) {
        this.selectedIndex = buttonIndex;
      }

      // Update the active button index for the current screen
      this.activeButtonIndices[containerIndex] = buttonIndex;

      this.cdr.detectChanges();
      this.drawArrows();
    }
  }
  isButtonDimmed(buttonIndex: number, containerIndex: number): boolean {
    const activeIndex = this.activeButtonIndices[containerIndex];
    return activeIndex !== null && activeIndex !== buttonIndex;
  }
  drawArrows(): void {
    this.cleanUpArrows();
    const numScreens = this.isMobile() ? 1 : 3;
    for (let containerIndex = 0; containerIndex < numScreens; containerIndex++) {
      const contentBox = this.contentBoxes.get(containerIndex);
      const selectedItem = this.selectedItems[containerIndex];
      if (!contentBox || !selectedItem) {
        continue;
      }
      const contentElement = contentBox.nativeElement;
      const buttonIndex = this.tutorialItems.indexOf(selectedItem);

      if (buttonIndex === -1 || buttonIndex >= this.buttons.length) {
        continue;
      }

      const buttonWrapper = this.buttons.find((btn, index) => index === buttonIndex + (containerIndex * this.tutorialItems.length));
      const buttonElement = buttonWrapper?.nativeElement;
      if (!contentElement || !buttonElement || !contentElement.isConnected || !buttonElement.isConnected) {
        continue;
      }
      const arrowDesign = selectedItem.arrowDesign || {
        color: '#ffffff',
        size: 2,
        path: 'fluid',
        startSocket: 'bottom',
        endSocket: 'left',
      };
      const leaderLine = new LeaderLine(contentElement, buttonElement, {
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

      this.leaderLines.push(leaderLine);
    }
  }

  cleanUpArrows(): void {
    if (this.leaderLines) {
      this.leaderLines.forEach(line => line.remove());
      this.leaderLines = [];
    }
  }

  closeTutorial(): void {
    this.activeButtonIndices = [null, null, null];
    this.leaderLines.forEach(line => line.remove());
    this.leaderLines = [];
    this.router.navigate(['/']);
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
    const chunkSize = 23.5;
    const words = content.split(' ');
    let currentLineLength = 0;
    let formattedContent = '';
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (currentLineLength + word.length > chunkSize && currentLineLength > 0) {
        formattedContent += '<br>';
        currentLineLength = 0;
      }
      formattedContent += (currentLineLength === 0 ? '' : ' ') + word;
      currentLineLength += word.length + (currentLineLength === 0 ? 0 : 1);
    }
    const highlightedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<span class="red-highlight">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(highlightedContent);
  }
  hasAnnotation(id: string): boolean {
    return this.annotatedButtonIds.includes(id);
  }

  trackByButtonId(index: number, btn: any): string {
    return btn.id; // Ensures Angular only updates changed buttons
  }
  // Add this new function
  getAnnotationDotStyle(id: string): any {
    const isMobile = this.isMobile();
    const positionOverrides = isMobile ? this.dotPositionMobileOverrides : this.dotPositionOverrides;
    const position = positionOverrides[id] || positionOverrides['default'];

    const dotSize = isMobile ? '8px' : '8px';
    const shadowSize = isMobile ? '2px' : '2px';

    return {
      position: 'absolute',
      top: position.top,
      right: position.right,
      width: dotSize,
      height: dotSize,
      'background-color': '#ff4e88',
      'border-radius': '50%',
      'box-shadow': `0 0 0 ${shadowSize} rgba(255, 78, 136, 0.3)`,
      'z-index': '10',
      'animation': 'pulse 2s infinite'
    };
  }

  hasLensFlare(id: string): boolean {
    return this.lensFlareButtonIds.includes(id);
  }


}
