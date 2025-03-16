import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Language } from '../language.enum';
import { TutorialScreen } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private selectedLanguage = new BehaviorSubject<Language>(Language.English);
  private tutorialScreens = new BehaviorSubject<TutorialScreen[]>([]);

  constructor(private http: HttpClient) {}

  getTutorialScreens(): Observable<TutorialScreen[]> {
    return this.selectedLanguage.pipe(
      switchMap((lang) => {
        const url = `http://localhost:3000/tutorial/${lang}`;
        return this.http.get<TutorialScreen[]>(url);
      }),
      tap((data) => {
        this.tutorialScreens.next(data);
      }),
    );
  }

  setLanguage(lang: Language): void {
    this.selectedLanguage.next(lang);
  }

  getTutorialScreensData(): Observable<TutorialScreen[]> {
    return this.tutorialScreens.asObservable();
  }

  saveTutorialData(lang: Language, updatedData: TutorialScreen[]): void {
    this.http.post(`http://localhost:3000/tutorial/${lang}`, updatedData).subscribe(
      () => console.log(`Updated ${lang} tutorial data saved successfully.`),
      (error) => console.error(`Failed to save ${lang} tutorial data:`, error),
    );
  }
}
