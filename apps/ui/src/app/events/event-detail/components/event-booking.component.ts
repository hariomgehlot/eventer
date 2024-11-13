import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BookingDialogComponent } from "./booking-dialog.component";
import { ApiService } from "../../../shared/services/api-service.service";
import { ToasterService } from "../../../shared/services/toaster.service";
import { Router } from "@angular/router";
import { PaymentService } from "../../../shared/services/payment.service";

@Component({
  selector: "app-event-booking",
  standalone: true,
  imports: [CommonModule, BookingDialogComponent],
  template: `
    <div class="bg-white rounded-lg shadow p-6">
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Price</h3>
        <p class="text-3xl font-bold text-indigo-600">
          {{ event?.price | currency }}
        </p>
      </div>

      <button
        (click)="showBookingDialog()"
        class="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
      >
        Book Now
      </button>

      <div class="mt-6 border-t pt-6">
        <h3 class="text-lg font-semibold mb-4">Event Details</h3>
        <div class="space-y-3">
          <div>
            <span class="text-gray-600">Duration:</span>
            <span class="ml-2 font-medium">{{ event?.duration }}</span>
          </div>
          <div>
            <span class="text-gray-600">Category:</span>
            <span class="ml-2 font-medium">{{ event?.category }}</span>
          </div>
          <div>
            <span class="text-gray-600">Capacity:</span>
            <span class="ml-2 font-medium">{{ event?.capacity }} people</span>
          </div>
        </div>
      </div>

      <app-booking-dialog
        *ngIf="isDialogOpen"
        [event]="event"
        (close)="isDialogOpen = false"
      ></app-booking-dialog>
    </div>
  `,
})
export class EventBookingComponent {
  @Input() event: any;
  isDialogOpen = false;
  apiService = inject(ApiService);
  toaster = inject(ToasterService);
  router = inject(Router);

  showBookingDialog() {
    if (this.apiService.isLoggedIn) {
      this.isDialogOpen = true;
    } else {
      this.toaster.showToast(
        "error",
        "You must be logged in to book an event."
      );

      this.router.navigate(["/signin"]);
    }
  }
}
