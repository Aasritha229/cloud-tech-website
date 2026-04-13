import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, ROUTER_CONFIGURATION } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideIcons } from '@ng-icons/core';
import {
  heroServer,
  heroCircleStack,
  heroDevicePhoneMobile,
  heroComputerDesktop,
  heroCloud
} from '@ng-icons/heroicons/outline';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled'
      })
    ),
    {
      provide: ROUTER_CONFIGURATION,
      useValue: { scrollOffset: [0, 80] }
    },
    provideAnimations(),
    provideIcons({
      heroServer,
      heroCircleStack,
      heroDevicePhoneMobile,
      heroComputerDesktop,
      heroCloud
    })
  ]
};
