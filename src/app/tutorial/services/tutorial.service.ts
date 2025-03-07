import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import tutorialData from '../data/tutorial-data.json';
import { TutorialScreen } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private selectedLanguage = new BehaviorSubject<string>('en');

  constructor() {}

  getTutorialScreens(): Observable<TutorialScreen[]> {
    return of(tutorialData);
  }

  setLanguage(lang: string): void {
    this.selectedLanguage.next(lang);
  }

  getLocalizedTutorialScreens(): Observable<TutorialScreen[]> {
    return this.selectedLanguage.pipe(
      switchMap((lang) => {
        // Load different JSON based on the selected language
        const localizedDataPath = `assets/data/tutorial-data.${lang}.json`;
        return of(tutorialData); // Replace this with actual HTTP request if needed
      }),
    );
  }
}
