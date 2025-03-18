import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone:false
})
export class ChatComponent {
  constructor(private router: Router) {}

  // Method to navigate to the home route
  goToHome(): void {
    this.router.navigate(['/']);
  }
}
