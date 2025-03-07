import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TutorialScreen } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private selectedLanguage = new BehaviorSubject<string>('en');
  private tutorialScreens = new BehaviorSubject<TutorialScreen[]>([]);

  constructor(private http: HttpClient) {}

  getTutorialScreens(): Observable<TutorialScreen[]> {
    return this.selectedLanguage.pipe(
      switchMap((lang) => {
        const localizedDataPath = `assets/data/tutorial-data.${lang}.json`;
        return this.http.get<TutorialScreen[]>(localizedDataPath);
      }),
      tap((data) => this.tutorialScreens.next(data)),
    );
  }

  setLanguage(lang: string): void {
    this.selectedLanguage.next(lang);
  }

  getTutorialScreensData(): Observable<TutorialScreen[]> {
    return this.tutorialScreens.asObservable();
  }

  saveTutorialData(lang: string, updatedData: TutorialScreen[]): void {
    const savePath = `assets/data/tutorial-data.${lang}.json`;
    this.http.post(savePath, updatedData).subscribe(
      () => console.log(`Updated ${lang} tutorial data saved successfully.`),
      (error) => console.error(`Failed to save ${lang} tutorial data:`, error),
    );
  }
}
