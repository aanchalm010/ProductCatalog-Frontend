import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideRouter } from '@angular/router'; 
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideRouter(routes) 
  ]
})
.catch(err => console.error(err));