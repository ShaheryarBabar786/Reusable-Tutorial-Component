import { ChangeDetectorRef, Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LibAutoDelegationModalComponent, PopupModalService } from 'nextsapien-component-lib'; // ✅ Import modal service
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { TutorialScreen } from '../tutorial/models/tutorial.model';
import { ModalService } from '../tutorial/services/modal.service';
import { TutorialService } from '../tutorial/services/tutorial.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  standalone: false,
})
export class IntroComponent {
  testInputs: string[] = new Array(7).fill('');
  tutorialItems: TutorialScreen[] = [];
  showModal: boolean = false;
  toggleModal: boolean = false;

  menuItems = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];

  modalDataDateRequest: any = {
    title: 'Sample Modal Data',
    preferences: {}, // Ensure preferences exist
  };
  countdown = 10;
  private componentDestroyed$ = new Subject<void>();
  selectedLanguage = 'en';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private tutorialService: TutorialService,
    private popupModalService: PopupModalService,
    private cdr: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService,
  ) {
    this.translate.addLangs(['en', 'es', 'fr']);
    const storedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.selectedLanguage = storedLang;
    this.translate.setDefaultLang('en');
    this.translate.use(this.selectedLanguage).subscribe(() => {
      this.loadData();
    });
    this.tutorialService.setLanguage(this.selectedLanguage);
  }

  startTutorial() {
    this.router.navigate(['/tutorial']);
  }

  openTutorialWithModal() {
    this.modalService.openModal();
    this.router.navigate(['/tutorial']);
  }

  onLanguageChange(event: Event) {
    this.selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translate.use(this.selectedLanguage).subscribe(() => {
      this.loadData();
    });
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    this.tutorialService.setLanguage(this.selectedLanguage);
  }

  loadData() {
    this.loadTutorialContent();
  }

  loadTutorialContent() {
    this.tutorialService.getTutorialScreens().subscribe((data) => {
      this.tutorialItems = data.slice(0, 7);
      this.testInputs = this.tutorialItems.map((item) => item.content);
    });
  }

  updateInputValue(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.testInputs[index] = inputElement.value;
  }

  saveUpdatedContent() {
    this.tutorialItems.forEach((item, index) => {
      if (index < this.testInputs.length) {
        item.content = this.testInputs[index];
      }
    });
    console.log('Updated tutorial content:', this.tutorialItems);
    this.tutorialService.saveTutorialData(this.selectedLanguage, this.tutorialItems);
  }

  // handleAutoDelegation(): void {
  //   this.showModal = true;
  //   const modalData = {
  //     data: this.modalDataDateRequest,
  //     countdown: this.countdown,
  //     menuItems: this.menuItems,
  //     expandedBaseCard: false,
  //     viewContainerRef: ViewContainerRef,
  //   };

  //   this.popupModalService
  //     .show(LibAutoDelegationModalComponent, modalData)
  //     .afterClose.pipe(first())
  //     .subscribe((data) => {
  //       this.onEvent(data);
  //     });
  // }
  handleAutoDelegation(): void {
    this.modalService.openModal(); // Open the modal
    const modalData = {
      data: this.modalDataDateRequest,
      countdown: this.countdown,
      menuItems: this.menuItems,
      expandedBaseCard: false,
      viewContainerRef: ViewContainerRef,
    };

    this.popupModalService
      .show(LibAutoDelegationModalComponent, modalData)
      .afterClose.pipe(first())
      .subscribe((data) => {
        this.onEvent(data);
      });
  }

  closeModal(): void {
    this.modalService.closeModal(); // Close the modal
  }

  onEvent(autoDelegationEvent: any): void {
    console.log('Auto Delegation event: ', autoDelegationEvent);
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
}
