import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false
})
export class ChatComponent {
  toggleModal: boolean = false; // ✅ Controls modal visibility

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }

  openModal(): void {
    console.log("🔵 Opening Modal...");
    this.toggleModal = true; // ✅ Show modal
    this.cdr.detectChanges(); // ✅ Force UI update
  }

  closeModal(): void {
    console.log("🔴 Closing Modal...");
    this.toggleModal = false; // ✅ Hide modal
    this.cdr.detectChanges();
  }

  onModalDismiss(): void {
    console.log("❌ Modal dismissed");
    this.closeModal(); // ✅ Sync UI after dismissal
  }
}
