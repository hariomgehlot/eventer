import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-event-schedule",
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3 class="text-xl font-semibold mb-3">Event Schedule</h3>
    <div class="space-y-4">
      @for (item of schedule; track item) {
      <div class="flex items-start">
        <div class="flex-shrink-0 w-32 text-sm font-medium text-gray-500">
          {{ item.from | date : "shortTime" }} -
          {{ item.to | date : "shortTime" }}
        </div>
        <div class="ml-4">
          <h4 class="text-lg font-medium">{{ item.title }}</h4>
          <p class="text-gray-600">{{ item.description }}</p>
        </div>
      </div>
      }
    </div>
  `,
})
export class EventScheduleComponent {
  @Input() schedule!: any[];
  console() {
    console.log(this.schedule);
  }
}
