import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
  standalone: false,
})
export class IntroComponent {
  testInputs = ['work update 1', 'Lorem ipsum dolor sit amet', 'work update 2', 'Another placeholder text', 'work update 3', 'More testing input fields'];

  constructor(private router: Router) {}

  startTutorial() {
    this.router.navigate(['/tutorial']);
  }
}
