import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter, RouterOutlet } from "@angular/router";
import { routes } from "./app/app.routes";
import { NavbarComponent } from "./app/shared/navbar/navbar.component";
import { provideHttpClient } from "@angular/common/http";
import { ToasterComponent } from "./app/shared/toaster/toaster.component";
import { provideAnimations } from "@angular/platform-browser/animations";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ToasterComponent],
  template: `
    <app-toaster></app-toaster>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
})
export class App {}

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()],
});
