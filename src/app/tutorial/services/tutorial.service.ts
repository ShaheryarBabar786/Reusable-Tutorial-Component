import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import tutorialData from '../data/tutorial-data.json';
import { TutorialScreen } from '../models/tutorial.model';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  getTutorialScreens(): Observable<TutorialScreen[]> {
    return of(tutorialData);
  }
}
