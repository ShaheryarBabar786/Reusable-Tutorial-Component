import { ChangeDetectorRef, Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LibAutoDelegationModalComponent, PopupModalService } from 'nextsapien-component-lib';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Language } from '../../app/tutorial/language.enum'; // Importing the Language enum for language selection
import { ModalData } from '../../app/tutorial/modal-data.interface'; // Importing ModalData interface for modal handling
import { TutorialScreen } from '../tutorial/models/tutorial.model'; // Importing TutorialScreen model
import { ModalService } from '../tutorial/services/modal.service'; // Service for handling modals
import { TutorialService } from '../tutorial/services/tutorial.service'; // Service for tutorial content management

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  standalone: false,
})
export class IntroComponent {
  testInputs: string[] = new Array(11).fill(''); // Array to store tutorial input values
  tutorialItems: TutorialScreen[] = []; // Array to hold tutorial screen data
  showModal: boolean = false; // Flag for showing/hiding modal
  toggleModal: boolean = false; // Flag for toggling modal visibility

  // Language selection menu items
  menuItems = [
    { label: 'English', value: Language.English },
    { label: 'Spanish', value: Language.Spanish },
    { label: 'French', value: Language.French },
  ];

  // Default modal data
  modalDataDateRequest: ModalData = {
    title: 'Sample Modal Data',
    preferences: {}, // Ensure preferences exist to avoid undefined errors
  };

  countdown = 10; // Countdown for modal actions
  private componentDestroyed$ = new Subject<void>(); // Observable to track component destruction
  selectedLanguage: Language = Language.English; // Default selected language

  constructor(
    private router: Router,
    private translate: TranslateService,
    private tutorialService: TutorialService,
    private popupModalService: PopupModalService,
    private cdr: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
  ) {
    // Add supported languages
    this.translate.addLangs([Language.English, Language.Spanish, Language.French]);

    // Get the stored language from localStorage or set default
    const storedLang = (localStorage.getItem('selectedLanguage') as Language) || Language.English;
    this.selectedLanguage = storedLang;
    this.translate.setDefaultLang(Language.English);

    // Set the selected language and load content accordingly
    this.translate.use(this.selectedLanguage).subscribe(() => {
      this.loadData();
    });

    this.tutorialService.setLanguage(this.selectedLanguage);
  }

  // Navigate to the tutorial page
  startTutorial() {
    this.router.navigate(['/tutorial']);
  }

  // Open tutorial modal and navigate to tutorial page
  openTutorialWithModal() {
    this.modalService.openModal();
    this.router.navigate(['/tutorial']);
  }

  // Handle language selection change
  onLanguageChange(event: Event) {
    this.selectedLanguage = (event.target as HTMLSelectElement).value as Language;
    this.translate.use(this.selectedLanguage).subscribe(() => {
      this.loadData();
    });
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    this.tutorialService.setLanguage(this.selectedLanguage);
  }

  // Load tutorial data
  loadData() {
    this.loadTutorialContent();
  }

  // Fetch tutorial content from the service
  loadTutorialContent() {
    this.tutorialService.getTutorialScreens().subscribe((data) => {
      this.tutorialItems = data.slice(0, 11); // Limit the items to 7
      this.testInputs = this.tutorialItems.map((item) => item.content);
    });
  }

  // Update input field value in the array
  updateInputValue(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.testInputs[index] = inputElement.value;
  }

  // Save updated tutorial content
  saveUpdatedContent() {
    this.tutorialItems.forEach((item, index) => {
      if (index < this.testInputs.length) {
        item.content = this.testInputs[index];
      }
    });
    console.log('Updated tutorial content:', this.tutorialItems);
    this.tutorialService.saveTutorialData(this.selectedLanguage, this.tutorialItems);
  }

  // Handle opening of auto-delegation modal
  handleAutoDelegation(): void {
    this.modalService.openModal(); // Open modal
    const modalData = {
      data: this.modalDataDateRequest,
      countdown: this.countdown,
      menuItems: this.menuItems,
      expandedBaseCard: false,
      viewContainerRef: this.viewContainerRef, // Proper instance reference
    };

    // Show modal and handle response after it closes
    this.popupModalService
      .show(LibAutoDelegationModalComponent, modalData)
      .afterClose.pipe(first())
      .subscribe((data) => {
        this.onEvent(data);
      });
  }

  // Close the modal
  closeModal(): void {
    this.modalService.closeModal();
  }

  // Handle modal event response
  onEvent(autoDelegationEvent: ModalData): void {
    console.log('Auto Delegation event: ', autoDelegationEvent);
  }

  // Cleanup on component destruction to prevent memory leaks
  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
