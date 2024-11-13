import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToasterComponent } from './shared/toaster/toaster.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  standalone: true,
  imports: [RouterModule, ToasterComponent, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Eventer';
}
