import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, User } from '../services/api-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white shadow-lg sticky  top-0 z-30">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16 ">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a routerLink="/" class="text-xl font-bold text-indigo-600"
                >EventHub</a
              >
            </div>
          </div>
          <div class="flex items-center space-x-4" *ngIf="!userData">
            <a routerLink="/signin" class="text-gray-700 hover:text-indigo-600"
              >Sign In</a
            >
            <a
              routerLink="/signup"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Sign Up
            </a>
          </div>
          <div class="flex items-center space-x-4" *ngIf="userData">
            <p class="text-gray-700 hover:text-indigo-600">
              Hi,
              {{ userData.mobile }}
            </p>
            <a
              routerLink="/"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              (click)="apiService.logout()"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    this.apiService.user$.subscribe((data) => {
      this.userData = data;
    });
  }
  apiService = inject(ApiService);
  user = this.apiService.user$;
  userData!: User | null;
}
