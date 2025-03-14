import { SafeHtml } from '@angular/platform-browser';

export interface TutorialScreen {
  id: number | string;
  label: string;
  content: string;
  icon: SafeHtml; // Change the type to SafeHtml
}
