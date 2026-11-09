import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, AppConfig)
  .catch((err) => console.error(err));