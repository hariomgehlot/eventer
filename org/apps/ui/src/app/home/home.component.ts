import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ApiService } from "../shared/services/api-service.service";
import { EventSkeletonComponent } from "../shared/event-skeleton/event-skeleton.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterLink, EventSkeletonComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Hero Section -->
      <div class="bg-indigo-600 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1
              class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              Find and Book Amazing Events
            </h1>
            <p class="mt-6 text-xl text-indigo-100 max-w-2xl mx-auto">
              Discover the best events happening in your city. From concerts to
              workshops, find something for everyone.
            </p>
            <div class="mt-10">
              <a
                routerLink="/signup"
                class="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-indigo-50 transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Featured Events Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Event Cards -->
          <ng-container *ngIf="featuredEvents.length === 0">
            <app-event-skeleton
              *ngFor="let _ of [1, 2, 3, 4, 5, 6]"
            ></app-event-skeleton>
          </ng-container>
          @for (event of featuredEvents; track event.id;) {
          <div
            class="bg-white rounded-lg shadow-md overflow-hidden group  h-full"
          >
            <img
              [src]="event.image"
              [alt]="event.title"
              class="w-full h-48 object-cover transition-transform duration-150 ease-in-out group-hover:scale-105"
            />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900">
                {{ event.title }}
              </h3>
              <p class="text-gray-500 mt-2">
                {{ event.date | date : "fullDate" }}
              </p>
              <p class="text-gray-600 mt-2">{{ event.description }}</p>
              <div class="mt-4 self-end">
                <a
                  [routerLink]="['/events', event.id]"
                  class="text-indigo-600 hover:text-indigo-500 font-medium items-center flex "
                >
                  Learn More →
                </a>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  featuredEvents: any = [];
  apiService: ApiService = inject(ApiService);
  ngOnInit() {
    this.apiService.getAllEvents().subscribe(async (data: any) => {
      this.featuredEvents = data.map((event: any, index: number) => ({
        id: event.id,
        title: event.name,
        date: event.event_date,
        description: event.description,
        image: event.image,
      }));
    });
    this.apiService.getEventImages().subscribe((data: any) => {
      console.log(data);
    });
  }
}
