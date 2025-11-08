import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ROOTROUTES } from './root.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura'; 

export const ROOTCONFIG: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(ROOTROUTES),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        }
      }
    })
  ]
};
