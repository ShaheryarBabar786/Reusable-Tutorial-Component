import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TutorialService } from '../tutorial/services/tutorial.service'; // ✅ Import TutorialService

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
  standalone: false,
})
export class IntroComponent {
  testInputs: string[] = []; // Empty array initially

  menuItems = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
  ];

  selectedLanguage = 'en'; // Default language

  constructor(
    private router: Router,
    private translate: TranslateService,
    private tutorialService: TutorialService, // ✅ Inject TutorialService
  ) {
    this.translate.addLangs(['en', 'es', 'fr']);

    // Load stored language or set default
    const storedLang = localStorage.getItem('selectedLanguage') || 'en';
    this.selectedLanguage = storedLang;

    this.translate.setDefaultLang('en');

    // Use language and ensure test inputs load
    this.translate.use(this.selectedLanguage).subscribe(() => {
      this.loadTestInputs();
    });

    // ✅ Notify TutorialService of language change
    this.tutorialService.setLanguage(this.selectedLanguage);
  }

  startTutorial() {
    this.router.navigate(['/tutorial']);
  }

  onLanguageChange(event: Event) {
    this.selectedLanguage = (event.target as HTMLSelectElement).value;

    this.translate.use(this.selectedLanguage).subscribe(() => {
      this.loadTestInputs(); // Ensure translations reload correctly
    });

    localStorage.setItem('selectedLanguage', this.selectedLanguage);

    // ✅ Notify TutorialService of language change
    this.tutorialService.setLanguage(this.selectedLanguage);
  }

  loadTestInputs() {
    this.translate
      .get([
        'TEST_INPUTS.WORK_UPDATE_1',
        'TEST_INPUTS.LOREM',
        'TEST_INPUTS.WORK_UPDATE_2',
        'TEST_INPUTS.ANOTHER_PLACEHOLDER',
        'TEST_INPUTS.WORK_UPDATE_3',
        'TEST_INPUTS.MORE_TESTING',
      ])
      .subscribe((translations) => {
        this.testInputs = [
          translations['TEST_INPUTS.WORK_UPDATE_1'],
          translations['TEST_INPUTS.LOREM'],
          translations['TEST_INPUTS.WORK_UPDATE_2'],
          translations['TEST_INPUTS.ANOTHER_PLACEHOLDER'],
          translations['TEST_INPUTS.WORK_UPDATE_3'],
          translations['TEST_INPUTS.MORE_TESTING'],
        ];
      });
  }
}
