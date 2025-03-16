import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Override console.error to suppress specific errors
const originalConsoleError = console.error;

console.error = function (message?: any, ...optionalParams: any[]) {
  // Suppress errors containing "SAGPathElement.setPathData"
  if (typeof message === 'string' && message.includes('SVGPathElement.setPathData')) {
    return; // Suppress this error
  }

  // Call the original console.error for other errors
  originalConsoleError.apply(console, arguments);
};

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // eslint-disable-next-line no-console -- because this is the required console
  .catch((err) => console.error(err));
