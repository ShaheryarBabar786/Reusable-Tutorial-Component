import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
  toggleModal: boolean = false;

  @ViewChild('contentBox', { static: false }) contentBox!: ElementRef;
  @ViewChildren('button') buttons!: QueryList<ElementRef>;

  constructor(
    @Inject(DomSanitizer) private sanitizer: DomSanitizer,
    private router: Router,
    private tutorialService: TutorialService,
    private cdr: ChangeDetectorRef,
    private translateService: TranslateService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const storedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.translateService.use(storedLang);

    this.translateService.onLangChange.subscribe(() => {
      this.loadTutorialScreens();
    });

    this.loadTutorialScreens();

    this.route.queryParams.subscribe((params) => {
      console.log('Query Params:', params); // 🔍 Debugging Log
      if (params['openModal'] === 'true') {
        this.toggleModal = true; // 🔥 Set modal to open
        console.log('Modal should open:', this.toggleModal); // 🔍 Debugging Log
      }
    });
  }

  loadTutorialScreens(): void {
    this.tutorialService.getTutorialScreens().subscribe((data) => {
      this.tutorialItems = data;
      this.selectedItem = this.tutorialItems[0];
      this.cdr.detectChanges();
      setTimeout(() => this.drawArrow(), 500);
    });
  }

  closeModal() {
    this.toggleModal = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.drawArrow(), 500);
  }

  ngAfterViewChecked(): void {
    if (this.selectedItem && !this.leaderLine) {
      this.drawArrow();
    }
  }

  selectItem(item: TutorialScreen): void {
    this.selectedItem = item;
    this.cdr.detectChanges();
    setTimeout(() => this.drawArrow(), 500);
  }

  setContentMargins(item: any) {
    // Example: If the content length exceeds a certain threshold, add more margin to the top
    let topMargin = '20px'; // Default margin
    if (item.content.length > 100) {
      // Example condition, adjust based on your requirements
      topMargin = '0px';
    }
    if (item.content.length < 100) {
      // Example condition, adjust based on your requirements
      topMargin = '100px';
    }
    return {
      'margin-top': topMargin,
      'margin-bottom': '10px', // Adjust as needed
    };
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

    // 🔥 Create new LeaderLine
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

    // 🔥 Animate the line smoothly
    const leaderLineElement = document.querySelector('.leader-line') as HTMLElement;
    if (leaderLineElement) {
      leaderLineElement.style.zIndex = '9999';
    }
  }

  closeTutorial(): void {
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
    const formattedContent = content.replace(/\[\[(.*?)\]\]/g, '<span class="custom-highlight">$1</span>');
    return this.sanitizer.bypassSecurityTrustHtml(formattedContent);
  }
}
