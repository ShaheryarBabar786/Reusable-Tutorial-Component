import { SafeHtml } from '@angular/platform-browser';

export interface TutorialScreen {
  id: number | string;
  label: string;
  content: string;
  icon: SafeHtml; // Change the type to SafeHtml
  arrowDesign?: {
    color?: string;
    size?: number;
    path?: 'fluid' | 'straight' | 'arc' | 'magnet';
    startSocket?: 'top' | 'right' | 'bottom' | 'left';
    endSocket?: 'top' | 'right' | 'bottom' | 'left';
  };
}
