import { ApplicationRef, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

import { AppComponent } from './app/app.component';

/**
 * Application entry point (MOD-MAIN). FROZEN after scaffold.
 * Screens are switched by GameStateService (not the router), so no router is provided —
 * this keeps the initial bundle small. The service worker enables offline play in production.
 */
const bootstrap: Promise<ApplicationRef> = bootstrapApplication(AppComponent, {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
});

bootstrap.catch((err: unknown) => console.error(err));

export default bootstrap;
