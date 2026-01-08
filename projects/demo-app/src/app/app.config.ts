import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTippyLoader, provideTippyConfig, tooltipVariation, popperVariation } from '@ngneat/helipopper/config';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideCCNextGenLayout } from 'ccnextgen-layout'

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideCCNextGenLayout({
      appTitle: 'Demo App',
    }),
  ]
};
