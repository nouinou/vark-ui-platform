import { bootstrapApplication } from '@angular/platform-browser';
import { initTheme } from '@vark-ui/theme';
import { appConfig } from './app/app.config';
import { App } from './app/app';

initTheme();

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
