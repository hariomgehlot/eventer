import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { EventHeaderComponent } from "./components/event-header.component";
import { EventScheduleComponent } from "./components/event-schedule.component";
import { EventBookingComponent } from "./components/event-booking.component";
import { ApiService } from "../../shared/services/api-service.service";

@Component({
  selector: "app-event-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    EventHeaderComponent,
    EventScheduleComponent,
    EventBookingComponent,
  ],
  template: `
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <app-event-header [event]="event"></app-event-header>

        <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow p-6">
              <h2 class="text-2xl font-bold mb-4">About This Event</h2>
              <p class="text-gray-600 mb-6">{{ event?.description }}</p>

              <app-event-schedule
                [schedule]="event?.schedule"
              ></app-event-schedule>
            </div>
          </div>

          <div class="lg:col-span-1">
            <app-event-booking [event]="event"></app-event-booking>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class EventDetailComponent implements OnInit {
  router = inject(ActivatedRoute);
  id = this.router.snapshot.paramMap.get("id");
  ngOnInit(): void {
    this.apiService.getEvent(this.id).subscribe((data) => {
      this.event = data;
    });
  }
  event!: any;
  apiService = inject(ApiService);
}
