// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { switchMap, tap } from 'rxjs/operators';
// import { Language } from '../language.enum'; // Import the Language enum
// import { TutorialScreen } from '../models/tutorial.model';

// @Injectable({
//   providedIn: 'root',
// })
// export class TutorialService {
//   private selectedLanguage = new BehaviorSubject<Language>(Language.English); // Use the Language enum
//   private tutorialScreens = new BehaviorSubject<TutorialScreen[]>([]);

//   constructor(private http: HttpClient) {}

//   getTutorialScreens(): Observable<TutorialScreen[]> {
//     return this.selectedLanguage.pipe(
//       switchMap((lang) => {
//         const localizedDataPath = `assets/data/tutorial-data.${lang}.json`;
//         return this.http.get<TutorialScreen[]>(localizedDataPath);
//       }),
//       tap((data) => this.tutorialScreens.next(data)),
//     );
//   }

//   setLanguage(lang: Language): void {
//     // Use the Language enum
//     this.selectedLanguage.next(lang);
//   }

//   getTutorialScreensData(): Observable<TutorialScreen[]> {
//     return this.tutorialScreens.asObservable();
//   }

//   saveTutorialData(lang: Language, updatedData: TutorialScreen[]): void {
//     // Use the Language enum
//     const savePath = `assets/data/tutorial-data.${lang}.json`;
//     this.http.post(savePath, updatedData).subscribe(
//       () => console.log(`Updated ${lang} tutorial data saved successfully.`),
//       (error) => console.error(`Failed to save ${lang} tutorial data:`, error),
//     );
//   }
// }

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
        console.log(`Fetching tutorial data from: ${url}`); // Debugging line
        return this.http.get<TutorialScreen[]>(url);
      }),
      tap((data) => {
        console.log('Received data:', data); // Debugging line
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
