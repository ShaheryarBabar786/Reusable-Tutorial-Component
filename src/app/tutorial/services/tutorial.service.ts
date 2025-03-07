import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TutorialScreen } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private selectedLanguage = new BehaviorSubject<string>('en');

  constructor(private http: HttpClient) {}

  getTutorialScreens(): Observable<TutorialScreen[]> {
    return this.selectedLanguage.pipe(
      switchMap((lang) => {
        const localizedDataPath = `assets/data/tutorial-data.${lang}.json`;
        return this.http.get<TutorialScreen[]>(localizedDataPath);
      }),
    );
  }
  setLanguage(lang: string): void {
    this.selectedLanguage.next(lang);
  }
}
