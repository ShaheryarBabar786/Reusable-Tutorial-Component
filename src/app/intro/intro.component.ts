import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TutorialScreen } from '../tutorial/models/tutorial.model';
import { TutorialService } from '../tutorial/services/tutorial.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent {
  testInputs: string[] = new Array(11).fill(''); // Ensure exactly 11 input fields
  tutorialItems: TutorialScreen[] = []; // Store tutorial data

  menuItems = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];

  selectedLanguage = 'en';

  constructor(
    private router: Router,
    private translate: TranslateService,
    private tutorialService: TutorialService,
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
    this.router.navigate(['/tutorial'], { queryParams: { openModal: true } });
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
      this.tutorialItems = data.slice(0, 11); // Ensure only 11 items are used
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

    // Send updated content to the service
    this.tutorialService.saveTutorialData(this.selectedLanguage, this.tutorialItems);
  }
}
