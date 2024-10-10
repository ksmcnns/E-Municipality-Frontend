import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter, withRouterConfig} from '@angular/router';
import {AppComponent} from './app/app.component';
import {routes} from './app/app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations"; // Import the routes

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withRouterConfig({
    paramsInheritanceStrategy: "always"
  })),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideToastr(),
    provideAnimations()]
}).catch(err => console.error(err));
